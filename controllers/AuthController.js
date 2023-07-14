const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { nombre, apellido, email, username, password } = req.body;

    // Verificar si el usuario ya está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya está registrado' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario con la contraseña encriptada
    const user = new User({ nombre, apellido, email, username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.log('Error en el registro:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe en la base de datos
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar si la contraseña es correcta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar el token JWT
    const token = generateToken(user._id);

    res.status(200).json({ token });
  } catch (error) {
    console.log('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const generateToken = (userId) => {
  const secretKey = 'nhbfbtyzqlfxtredtjdyrltplavzwiobkjkrlzoiistoamalclunegjpweugmizfmurdlyefopyhkbsxnltmonhgjnjhmouravmqffpaiaoybxcsdjqbzbpjqrsytbwe'; // Reemplaza con tu clave secreta
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  return token;
};

module.exports = { register, login };
