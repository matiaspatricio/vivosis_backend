const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar al usuario en la base de datos por nombre de usuario
    const user = await User.findOne({ username });

    // Verificar si el usuario existe
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar el token JWT
    const token = jwt.sign({ userId: user._id }, 'nhbfbtyzqlfxtredtjdyrltplavzwiobkjkrlzoiistoamalclunegjpweugmizfmurdlyefopyhkbsxnltmonhgjnjhmouravmqffpaiaoybxcsdjqbzbpjqrsytbwe', { expiresIn: '1h' });

    // Enviar el token como respuesta
    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
