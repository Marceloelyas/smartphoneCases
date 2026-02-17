const Stripe = require('stripe');
require('dotenv').config();

// Verifica se a chave da API está configurada
if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('⚠️  STRIPE_SECRET_KEY não configurada. Pagamentos não funcionarão.');
}

// Inicializa o Stripe com a chave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Use a versão mais recente da API
  maxNetworkRetries: 3, // Número de tentativas em caso de falha de rede
  timeout: 30000, // Timeout de 30 segundos para requisições
  telemetry: true, // Habilita telemetria para ajudar na otimização
});

// Configurações de webhook
const webhookConfig = {
  secret: process.env.STRIPE_WEBHOOK_SECRET,
  // Eventos que a aplicação deve processar
  events: [
    'payment_intent.succeeded',
    'payment_intent.payment_failed',
    'payment_intent.canceled',
    'charge.refunded',
    'checkout.session.completed',
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted'
  ]
};

// Utilitários para operações comuns do Stripe
const stripeUtils = {
  // Cria um Payment Intent para pagamento
  createPaymentIntent: async (amount, currency = 'brl', metadata = {}) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe trabalha com centavos
        currency,
        metadata,
        automatic_payment_methods: {
          enabled: true,
        },
      });
      
      return {
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      };
    } catch (error) {
      console.error('Erro ao criar Payment Intent:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Confirma um pagamento manualmente (se necessário)
  confirmPaymentIntent: async (paymentIntentId) => {
    try {
      const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
      return {
        success: true,
        status: paymentIntent.status,
        paymentIntent,
      };
    } catch (error) {
      console.error('Erro ao confirmar Payment Intent:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Cria uma sessão de checkout
  createCheckoutSession: async (items, successUrl, cancelUrl, customerEmail = null) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'boleto'],
        line_items: items,
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        customer_email: customerEmail,
        locale: 'pt-BR',
        allow_promotion_codes: true,
      });
      
      return {
        success: true,
        sessionId: session.id,
        url: session.url,
      };
    } catch (error) {
      console.error('Erro ao criar sessão de checkout:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Processa webhooks do Stripe
  handleWebhook: (payload, signature) => {
    try {
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookConfig.secret
      );
      
      // Verifica se o evento é suportado
      if (!webhookConfig.events.includes(event.type)) {
        console.log(`Evento não processado: ${event.type}`);
        return {
          success: true,
          processed: false,
          event: event.type,
        };
      }
      
      return {
        success: true,
        processed: true,
        event: event.type,
        data: event.data.object,
      };
    } catch (error) {
      console.error('Erro ao processar webhook:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Gera um link de pagamento para o cliente
  generatePaymentLink: async (amount, description, metadata = {}) => {
    try {
      // Cria um produto temporário
      const product = await stripe.products.create({
        name: description,
        metadata,
      });
      
      // Cria um preço para o produto
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: Math.round(amount * 100),
        currency: 'brl',
      });
      
      // Cria um link de pagamento
      const paymentLink = await stripe.paymentLinks.create({
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        after_completion: {
          type: 'redirect',
          redirect: {
            url: process.env.STRIPE_SUCCESS_URL,
          },
        },
      });
      
      return {
        success: true,
        url: paymentLink.url,
        paymentLinkId: paymentLink.id,
      };
    } catch (error) {
      console.error('Erro ao gerar link de pagamento:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Cria ou recupera um cliente
  getOrCreateCustomer: async (email, name, metadata = {}) => {
    try {
      // Procura cliente existente
      const customers = await stripe.customers.list({
        email,
        limit: 1,
      });
      
      if (customers.data.length > 0) {
        return {
          success: true,
          customer: customers.data[0],
          existing: true,
        };
      }
      
      // Cria novo cliente
      const customer = await stripe.customers.create({
        email,
        name,
        metadata,
      });
      
      return {
        success: true,
        customer,
        existing: false,
      };
    } catch (error) {
      console.error('Erro ao criar/recuperar cliente:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
};

// Valores padrão para produtos (opcional)
const defaultProducts = {
  case: {
    name: 'Case Personalizado',
    description: 'Case de smartphone personalizado com sua imagem',
    images: ['https://api.smartphonecases.com/images/default-case.png'],
  }
};

module.exports = {
  stripe,
  stripeUtils,
  webhookConfig,
  defaultProducts
};
