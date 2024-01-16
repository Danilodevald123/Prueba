const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");

/**
 * Traer todos los usuarios activos.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} - La función no devuelve un valor directamente, sino que responde a través de `res` con la lista de usuarios activos.
 */
const traerUsuarios = async (req, res) => {
    try {
        
        const usuarios = await Usuario.findAll();

        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error interno del servidor",
        });
    }
};

/**
 * Traer un usuario por su ID.
 *
 * @param {Object} req - Objeto de solicitud de Express que contiene el parámetro de ruta `id`.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} - La función no devuelve un valor directamente, sino que responde a través de `res` con el usuario encontrado.
 */
const traerUsuario =  async (req, res) => {
    const id = req.params.id;
    const usuario = await Usuario.findByPk(id);
    res.json(usuario);
};

/**
 * Modificar un usuario existente.
 *
 * @param {Object} req - Objeto de solicitud de Express que contiene el parámetro de ruta `id` y la información del usuario a modificar en el cuerpo.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} - La función no devuelve un valor directamente, sino que responde a través de `res` con un mensaje indicando el resultado de la modificación.
 */
const modificarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nombre,
            apellido,
            fechaNacimiento,
            dni,
            email,
            contrasena,
            fotoPerfil,
            rol
        } = req.body;

        // Validación de campos obligatorios
        if (!nombre || !apellido || !fechaNacimiento || !dni || !email) {
            return res.status(400).json({
                error: "Campos obligatorios incompletos",
            });
        }

        let hashedPassword;
        if (contrasena) {
            hashedPassword = await bcrypt.hash(contrasena, 10);
        }

        // Actualización de usuario en la base de datos
        const result = await Usuario.update(
            {
                nombre,
                apellido,
                fechaNacimiento,
                dni,
                email,
                contrasena: hashedPassword,
                fotoPerfil,
                rol
            },
            {
                where: { id },
            }
        );

        if (result[0]) {
            res.status(200).json({ message: "Usuario modificado exitosamente" });
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error interno del servidor",
        });
    }
};

/**
 * Desactivar un usuario existente.
 *
 * @param {Object} req - Objeto de solicitud de Express que contiene el parámetro de ruta `id`.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} - La función no devuelve un valor directamente, sino que responde a través de `res` con un mensaje indicando el resultado de la desactivación.
 */
const desactivarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        // Desactivar el usuario en la base de datos
        const result = await Usuario.update(
            { activo: false },
            { where: { id } }
        );

        if (result[0]) {
            res.status(200).json({ message: "Usuario desactivado exitosamente" });
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error interno del servidor",
        });
    }
};

/**
 * Activar un usuario desactivado.
 *
 * @param {Object} req - Objeto de solicitud de Express que contiene el parámetro de ruta `id`.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} - La función no devuelve un valor directamente, sino que responde a través de `res` con un mensaje indicando el resultado de la activación.
 */
const activarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        // Activar el usuario en la base de datos
        const result = await Usuario.update(
            { activo: true },
            { where: { id } }
        );

        if (result[0]) {
            res.status(200).json({ message: "Usuario activado exitosamente" });
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error interno del servidor",
        });
    }
};

module.exports = {
    traerUsuarios,
    traerUsuario,
    modificarUsuario,
    desactivarUsuario,
    activarUsuario
};
