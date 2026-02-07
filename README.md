# Smartphone Cases - Designer de Capinhas Personalizadas

Sistema completo para criação e venda de capinhas de celular personalizadas.

## 🚀 Funcionalidades

### 🎨 Designer Online
- Interface drag-and-drop para personalização
- Upload de imagens e textos personalizados
- Seleção de cores e modelos de celular
- Preview em tempo real

### 🛒 E-commerce Completo
- Catálogo de modelos
- Carrinho de compras
- Checkout com múltiplos métodos de pagamento
- Rastreamento de pedidos

### 👥 Sistema de Usuários
- Cadastro e login
- Dashboard do usuário
- Histórico de pedidos
- Designs salvos

### ⚙️ Painel Administrativo
- Gestão de usuários
- Controle de pedidos
- Estatísticas e relatórios
- Configurações do sistema

## 🏗️ Arquitetura

### Frontend
- **React 18** com TypeScript
- **Redux Toolkit** para gerenciamento de estado
- **React Router** para navegação
- **Tailwind CSS** para estilização
- **Vite** como build tool

### Backend
- **Node.js** com Express
- **PostgreSQL** com Sequelize ORM
- **Redis** para cache e sessões
- **JWT** para autenticação
- **Multer** para upload de arquivos

### Infraestrutura
- **Docker** e **Docker Compose**
- **Nginx** como reverse proxy
- **PostgreSQL** como banco principal
- **Redis** para cache

## 🛠️ Instalação

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose
- PostgreSQL 15+
- Redis 7+

### Configuração

1. **Clone o repositório**

git clone https://github.com/seu-usuario/smartphone-cases.git
cd smartphone-cases

1. Configure as variáveis de ambiente

cp .env.example .env
# Edite o arquivo .env com suas configurações


1. Inicie com Docker (recomendado)

docker-compose up -d

1. Ou instale manualmente

# Backend:

cd backend
npm install
npm run migrate
npm run seed
npm start

# Frontend:

cd frontend
npm install
npm run dev


1. Acesse a aplicação

· Frontend: http://localhost:5173
· Backend API: http://localhost:3001
· Admin: http://localhost:5173/admin (usuário: admin@example.com / senha: admin123)

📁 Estrutura do Projeto

smartphoneCases/
├── frontend/              # Aplicação React
├── backend/               # API Node.js/Express
├── database/              # Scripts do banco de dados
├── nginx/                 # Configuração Nginx
├── docker/                # Configurações Docker
├── scripts/               # Scripts utilitários
└── docker-compose.yml     # Orquestração Docker

🔧 Comandos Úteis

# Docker

# Iniciar todos os serviços
docker-compose up -d

# Parar serviços
docker-compose down

# Visualizar logs
docker-compose logs -f

# Rebuildar imagens
docker-compose build --no-cache

# Executar comandos em containers
docker-compose exec backend npm test

Desenvolvimento

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar testes
npm test

# Lint do código
npm run lint

📊 Banco de Dados

Modelos Principais

· Users: Usuários do sistema
· PhoneModels: Modelos de celular disponíveis
· Designs: Designs personalizados criados
· Orders: Pedidos realizados
· Payments: Pagamentos processados

Migrações

# Criar nova migração
npm run migrate:create -- --name nome-da-migracao

# Executar migrações
npm run migrate

# Reverter migração
npm run migrate:undo

🔐 Segurança

Autenticação

· JWT com refresh tokens
· Rate limiting por IP
· Validação de entrada em todas as rotas
· Sanitização de dados

Upload de Arquivos

· Validação de tipo e tamanho
· Geração de thumbnails
· Armazenamento seguro

Pagamentos

· Integração com Stripe e Mercado Pago
· Webhooks para confirmação
· Transações criptografadas

🧪 Testes

# Testes unitários
npm test

# Testes de integração
npm run test:integration

# Testes E2E
npm run test:e2e

# Coverage
npm run test:coverage

📈 Monitoramento

Logs

· Winston para logging estruturado
· Logs separados por ambiente
· Rotação automática de arquivos

Métricas

· Endpoint de health check
· Monitoramento de performance
· Alertas de erro

🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (git checkout -b feature/nova-feature)
3. Commit suas alterações (git commit -am 'Adiciona nova feature')
4. Push para a branch (git push origin feature/nova-feature)
5. Abra um Pull Request

📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

🆘 Suporte

· Documentação: docs.smartphonecases.com
· Issues: GitHub Issues
· Email: suporte@smartphonecases.com

🙏 Agradecimentos

· React
· Node.js
· Docker
· Tailwind CSS
· Vite