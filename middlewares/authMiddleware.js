// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const secretKey = 'nhbfbtyzqlfxtredtjdyrltplavzwiobkjkrlzoiistoamalclunegjpweugmizfmurdlyefopyhkbsxnltmonhgjnjhmouravmqffpaiaoybxcsdjqbzbpjqrsytbwe'; // Reemplaza esto con tu clave secreta

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token inválido' });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }
};

module.exports = authenticateToken;
