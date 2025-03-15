const express = require('express');

const{ registerUser , login, logout, getUser } = require('../controllers/AuthenticationController');
const authMiddleware = require('../middleware/authMiddleware.js');
const router = express.Router();

router.post('/login', login);
router.post('/registerUser',registerUser);
router.post('/logout', logout);
router.get('/me', authMiddleware, getUser)

module.exports = router;