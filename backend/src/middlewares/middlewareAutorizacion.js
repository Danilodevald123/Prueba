const Usuario = require("../models/Usuario");

/**
 * Middleware para autorizar el acceso solo a usuarios con el rol de administrador.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {function} next - Función para pasar la solicitud al siguiente middleware.
 * @returns {void} - La función no devuelve un valor directamente, sino que llama a `next` o responde a través de `res`.
 */
const isAdmin = async (req, res, next) => {
    try {
        const userEmail = req.user.email;

        // Consulta la base de datos para obtener el usuario por su correo electrónico
        const user = await Usuario.findOne({ where: { email: userEmail } });

        // Verifica si el usuario existe y tiene el rol de 'admin'
        if (user && user.rol === 'admin') {
            return next();
        }

        return res.status(403).json({ error: 'Acceso no autorizado' });
    } catch (error) {
        console.error('Error en middleware isAdmin:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = isAdmin;
