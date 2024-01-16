const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");
const { generateAccessToken } = require("../middlewares/jwt");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { uploadFile } = require("../utils/ftp");

// Configuración de variables de entorno
dotenv.config();

/**
 * Autenticación de usuario (SSO - Single Sign-On)
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} - La función no devuelve un valor directamente, sino que responde a través de `res`.
 */
const sso = async (req, res) => {
    try {
        let {
            nombre,
            apellido,
            fechaNacimiento,
            dni,
            email,
            contrasena,
            rol
        } = req.body;

        // Validación de campos obligatorios
        if (!email || !contrasena) {
            // Si falta información, intentamos obtenerla del token en el encabezado
            if (!req.headers['authorization']) {
                return res.status(400).json({
                    error: "Campos obligatorios incompletos",
                });
            } else {
                const authHeader = req.headers['authorization'];
                const token = authHeader && authHeader.split(' ')[1];
                const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
                email = decoded.email;
            }
        }

        // Buscar el usuario en la base de datos
        let usuario = await Usuario.findOne({
            where: {
                email: email,
            },
        });

        let usuarioNuevo = false;

        if (!usuario) {
            // Si el usuario no existe, procedemos a registrarlo
            if (!nombre || !apellido || !fechaNacimiento || !dni || !contrasena) {
                return res.status(400).json({
                    error: "Campos obligatorios incompletos",
                });
            }

            // Verificar si el DNI ya está registrado
            usuario = await Usuario.findOne({
                where: {
                    dni: dni,
                },
            });

            if (usuario) {
                // Si el DNI ya está registrado, devuelve un error
                return res.status(400).json({
                    error: "El DNI ya está registrado",
                });
            }

            const hashedPassword = await bcrypt.hash(contrasena, 10);

            // Subir archivo si está presente en la solicitud
            if (req.file) {
                try {
                    await uploadFile(req, res);
                } catch (error) {
                    console.error("Error al subir el archivo:", error);
                    res.status(500).json({ error: "Error al subir el archivo" });
                    return;  // Detenemos la ejecución si hay un error en la subida del archivo
                }
            }

            // Crear nuevo usuario en la base de datos
            usuario = await Usuario.create({
                nombre,
                apellido,
                fechaNacimiento,
                dni,
                email: email,
                contrasena: hashedPassword,
                fotoPerfil: req.file ? "fotos/" + req.file.originalname : "",
                rol
            });

            usuarioNuevo = true;
        } else if (!req.headers['authorization']) {
            // Si el usuario existe, comparamos las contraseñas
            const compare =
                usuario.contrasena === null && usuario.created_in_google === true
                    ? true
                    : await bcrypt.compare(contrasena, usuario.contrasena);

            if (!compare) {
                return res.status(400).send("contraseña incorrecta");
            }
        }

        // Generar tokens de acceso y actualización
        const token = generateAccessToken({ email: req.body.email }, "1d");
        const refreshToken = generateAccessToken({ email: req.body.email }, "1d");

        // Construir el objeto de respuesta sin incluir la contraseña
        const respuestaUsuario = {
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            fechaNacimiento: usuario.fechaNacimiento,
            dni: usuario.dni,
            email: usuario.email,
            fotoPerfil: usuario.fotoPerfil,
            rol: usuario.rol,
            usuarioNuevo: usuarioNuevo,
            accessToken: token,
            refreshToken: refreshToken,
        };

        res.status(200).json(respuestaUsuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error interno del servidor",
        });
    }
};

module.exports = {
    sso,
};
