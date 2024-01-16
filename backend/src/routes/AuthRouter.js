const { Router } = require('express');
const { sso } = require('../controllers/AuthController');

/**
 * Router para las rutas relacionadas con la autenticación.
 * @typedef {import('express').Router} Router
 */
const authRouter = Router();

const multer = require('multer');
const upload = multer({ dest: '/fotos' });

/**
 * Ruta para el proceso de inicio de sesión único (SSO).
 *
 * @name POST /sso
 * @function
 * @memberof module:AuthRouter
 * @inner
 * @param {string} path - La ruta para el proceso SSO.
 * @param {Function} middleware - Middleware de multer para procesar la carga de archivos (foto de perfil).
 * @param {Function} handler - Controlador para manejar la lógica del proceso SSO.
 * @returns {void} - La función no devuelve un valor directamente, sino que se encarga de procesar la solicitud.
 */
authRouter.post("/sso", upload.single('fotoPerfil'), sso);

module.exports = authRouter;
