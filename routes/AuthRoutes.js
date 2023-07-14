const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { register, login } = require('../controllers/AuthController');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', register);
router.post('/login', login);


module.exports = router;
