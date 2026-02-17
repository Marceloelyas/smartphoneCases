// backend/src/config/database.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configurações do banco de dados
const sequelize = new Sequelize(
  process.env.DB_NAME || 'smartphone_cases',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    timezone: '-03:00', // Ajuste para seu fuso horário
    pool: {
      max: 10, // Máximo de conexões no pool
      min: 0,  // Mínimo de conexões no pool
      acquire: 30000, // Tempo máximo, em ms, que o pool tentará obter conexão antes de lançar erro
      idle: 10000 // Tempo máximo, em ms, que uma conexão pode ficar ociosa antes de ser liberada
    },
    define: {
      timestamps: true, // Adiciona createdAt e updatedAt automaticamente
      underscored: true, // Usa snake_case para nomes de colunas
      underscoredAll: true,
      freezeTableName: false, // Permite que o Sequelize pluralize nomes de tabelas
    },
    dialectOptions: {
      // Configurações adicionais para MySQL
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      // Para conexões SSL em produção
      ...(process.env.NODE_ENV === 'production' && {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      })
    }
  }
);

// Função para testar a conexão
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
    
    // Sincroniza os modelos com o banco de dados (apenas em desenvolvimento)
    if (process.env.NODE_ENV === 'development') {
      // force: true recria as tabelas (cuidado com dados existentes!)
      // alter: true atualiza a estrutura sem perder dados
      await sequelize.sync({ alter: true });
      console.log('✅ Modelos sincronizados com o banco de dados!');
    }
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:', error.message);
    process.exit(1); // Encerra a aplicação se não conseguir conectar
  }
};

module.exports = {
  sequelize,
  testConnection,
  // Exporta operadores do Sequelize se necessário
  Op: Sequelize.Op
};
