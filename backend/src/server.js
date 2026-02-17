const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const modelRoutes = require('./routes/modelRoutes');
const designRoutes = require('./routes/designRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Import middleware
const errorMiddleware = require('./middleware/errorMiddleware');
const loggingMiddleware = require('./middleware/loggingMiddleware');

// Import database connection
const db = require('./database/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Logging middleware
app.use(loggingMiddleware);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Connect to database and start server
db.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

module.exports = app;

// Exemplo de uso em um controller
const { sequelize } = require('../config/database');
const { cacheUtils } = require('../config/redis');
const { stripeUtils } = require('../config/stripe');

// Exemplo de uso em um arquivo principal (app.js)
const { testConnection } = require('./config/database');
const { testRedisConnection } = require('./config/redis');

// Testa conexões ao iniciar a aplicação
async function initializeApp() {
  await testConnection();
  await testRedisConnection();
  
  // Inicia o servidor
  app.listen(3000, () => {
    console.log('🚀 Servidor rodando na porta 3000');
  });
}

initializeApp();
