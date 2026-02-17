const Redis = require('ioredis');
require('dotenv').config();

// Configuração do Redis
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || null,
  db: process.env.REDIS_DB || 0,
  retryStrategy: (times) => {
    // Estratégia de retry: tenta reconectar com backoff exponencial
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  lazyConnect: false, // Conecta automaticamente ao instanciar
};

// Cliente principal do Redis
const redis = new Redis(redisConfig);

// Cliente para publicar mensagens (pode usar a mesma instância)
const redisPublisher = new Redis(redisConfig);

// Cliente para assinar mensagens (precisa de uma conexão separada)
const redisSubscriber = new Redis(redisConfig);

// Event listeners para monitoramento
redis.on('connect', () => {
  console.log('🔄 Conectando ao Redis...');
});

redis.on('ready', () => {
  console.log('✅ Redis conectado e pronto para uso!');
});

redis.on('error', (error) => {
  console.error('❌ Erro na conexão Redis:', error.message);
});

redis.on('close', () => {
  console.log('🔌 Conexão Redis fechada');
});

// Função para testar a conexão
const testRedisConnection = async () => {
  try {
    await redis.ping();
    console.log('✅ Redis respondendo ao PING!');
    
    // Teste de escrita/leitura
    await redis.set('test:connection', 'OK', 'EX', 10);
    const test = await redis.get('test:connection');
    console.log(`✅ Redis teste de leitura/escrita: ${test}`);
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao testar Redis:', error.message);
    return false;
  }
};

// Utilitários para cache
const cacheUtils = {
  // Salva dados no cache com expiração
  set: async (key, data, expirationSeconds = 3600) => {
    try {
      const serialized = JSON.stringify(data);
      await redis.set(key, serialized, 'EX', expirationSeconds);
      return true;
    } catch (error) {
      console.error(`Erro ao salvar cache para key ${key}:`, error);
      return false;
    }
  },

  // Recupera dados do cache
  get: async (key) => {
    try {
      const data = await redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Erro ao recuperar cache para key ${key}:`, error);
      return null;
    }
  },

  // Invalida/remove uma chave do cache
  invalidate: async (key) => {
    try {
      await redis.del(key);
      return true;
    } catch (error) {
      console.error(`Erro ao invalidar cache para key ${key}:`, error);
      return false;
    }
  },

  // Invalida múltiplas chaves por padrão
  invalidatePattern: async (pattern) => {
    try {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(keys);
      }
      return keys.length;
    } catch (error) {
      console.error(`Erro ao invalidar cache para pattern ${pattern}:`, error);
      return 0;
    }
  }
};

module.exports = {
  redis,
  redisPublisher,
  redisSubscriber,
  testRedisConnection,
  cacheUtils
};
