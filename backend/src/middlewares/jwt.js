const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Configuración de variables de entorno
dotenv.config();

/**
 * Genera un token de acceso utilizando el algoritmo JWT (JSON Web Token).
 *
 * @param {Object} username - El nombre de usuario o la información que se desea incluir en el token.
 * @param {string} expirationTime - El tiempo de expiración del token en formato de duración (por ejemplo, '1d' para un día).
 * @returns {string} - El token de acceso generado.
 */
function generateAccessToken(username, expirationTime) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: expirationTime });
}

/**
 * Middleware para autenticar un token de acceso en las solicitudes.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {function} next - Función para pasar la solicitud al siguiente middleware.
 * @returns {void} - La función no devuelve un valor directamente, sino que llama a `next` o responde a través de `res`.
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

module.exports = {
  generateAccessToken,
  authenticateToken
};

