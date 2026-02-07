const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const authValidator = require('../validators/authValidator');

// Public routes
router.post('/register', authValidator.register, authController.register);
router.post('/login', authValidator.login, authController.login);

// Protected routes
router.get('/profile', authMiddleware.authenticate, authController.getProfile);
router.put('/profile', authMiddleware.authenticate, authController.updateProfile);
router.post('/logout', authMiddleware.authenticate, authController.logout);

module.exports = router;