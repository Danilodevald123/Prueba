const { Router } = require('express');
const { traerUsuarios, desactivarUsuario, activarUsuario } = require('../controllers/UserController');

/**
 * Enrutador para las operaciones relacionadas con los usuarios.
 * @typedef {import('express').Router} Router
 */
const usRouter = Router();

/**
 * Ruta para obtener la lista de usuarios activos.
 *
 * @name GET /usuarios
 * @function
 * @memberof module:UserRouter
 * @inner
 * @param {string} path - La ruta para obtener la lista de usuarios activos.
 * @param {Function} handler - Controlador para manejar la obtención de la lista de usuarios activos.
 * @returns {void} - La función no devuelve un valor directamente, sino que se encarga de procesar la solicitud.
 */
usRouter.get("/usuarios", traerUsuarios);

/**
 * Ruta para desactivar a un usuario específico.
 *
 * @name PUT /desactivar/:id
 * @function
 * @memberof module:UserRouter
 * @inner
 * @param {string} path - La ruta para desactivar a un usuario específico por su ID.
 * @param {Function} handler - Controlador para manejar la desactivación de un usuario.
 * @returns {void} - La función no devuelve un valor directamente, sino que se encarga de procesar la solicitud.
 */
usRouter.put('/desactivar/:id', desactivarUsuario);

/**
 * Ruta para activar a un usuario específico.
 *
 * @name PUT /activar/:id
 * @function
 * @memberof module:UserRouter
 * @inner
 * @param {string} path - La ruta para activar a un usuario específico por su ID.
 * @param {Function} handler - Controlador para manejar la activación de un usuario.
 * @returns {void} - La función no devuelve un valor directamente, sino que se encarga de procesar la solicitud.
 */
usRouter.put('/activar/:id', activarUsuario);

module.exports = usRouter;
