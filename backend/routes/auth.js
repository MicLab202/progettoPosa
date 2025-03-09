const express = require('express');

const{ registerUser , login, logout } = require('../controllers/AuthenticationController');
const authMiddleware = require('../middleware/authMiddleware.js');
const router = express.Router();

router.post('/login', login);
router.post('/registerUser',registerUser);
router.post('/logout', logout);

module.exports = router;