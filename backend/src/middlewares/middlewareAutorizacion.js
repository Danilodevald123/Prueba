const Usuario = require("../models/Usuario");

/**
 * Function to validate if user has admin rol
 * 
 * @returns 
 * 
 * @param {Object} req - http request object
 * @param {Object} req - http request object
 * @param {Object} req - http request object
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