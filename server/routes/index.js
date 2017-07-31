const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tutordb');

module.exports = (router) => {
    router.post('/register', userController.register);
    router.post('/login', authMiddleware.authenticate, authMiddleware.serialize,
            authMiddleware.generateToken, authMiddleware.sendAuthToken);
    router.get('/users', authMiddleware.checkAuthToken, authMiddleware.checkAuthTokenValid,
            userController.getUsers);
    router.delete('/logout', authMiddleware.checkAuthToken, authMiddleware.checkAuthTokenValid, authMiddleware.logout)
}