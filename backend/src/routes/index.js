const { Router } = require('express');
const usRouter = require('./userRouter');
const authRouter = require("./AuthRouter");
const { authenticateToken } = require('../middlewares/jwt');
const isAdmin = require('../middlewares/middlewareAutorizacion');
const usuarioRouter = require('./usuarioRouter');

/**
 * Enrutador principal que configura y agrupa todos los enrutadores de la aplicación.
 * @typedef {import('express').Router} Router
 */
const router = Router();

// Configurar los routers

/**
 * Enrutador para las rutas de autenticación.
 * @name /auth
 * @function
 * @memberof module:index
 * @inner
 * @param {string} path - La ruta base para las operaciones de autenticación.
 * @param {Object} handler - Enrutador específico para las operaciones de autenticación.
 * @returns {void} - La función no devuelve un valor directamente, sino que se encarga de procesar la solicitud.
 */
router.use("/auth", authRouter);

/**
 * Enrutador para las operaciones relacionadas con los usuarios.
 * @name /users
 * @function
 * @memberof module:index
 * @inner
 * @param {string} path - La ruta base para las operaciones de usuarios.
 * @param {Function} middleware - Middleware para autenticar el token y verificar el rol de administrador.
 * @param {Function} middleware - Middleware para verificar si el usuario tiene el rol de administrador.
 * @param {Object} handler - Enrutador específico para las operaciones de usuarios.
 * @returns {void} - La función no devuelve un valor directamente, sino que se encarga de procesar la solicitud.
 */
router.use("/users", authenticateToken, isAdmin, usRouter);

/**
 * Enrutador para las operaciones relacionadas con un usuario específico.
 * @name /user
 * @function
 * @memberof module:index
 * @inner
 * @param {string} path - La ruta base para las operaciones de usuario específico.
 * @param {Function} middleware - Middleware para autenticar el token.
 * @param {Object} handler - Enrutador específico para las operaciones de usuario específico.
 * @returns {void} - La función no devuelve un valor directamente, sino que se encarga de procesar la solicitud.
 */
router.use("/user", authenticateToken, usuarioRouter);

module.exports = router;
