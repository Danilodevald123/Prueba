const { Router } = require('express');
const { traerUsuario, modificarUsuario } = require('../controllers/UserController');

/**
 * Enrutador para las operaciones relacionadas con un usuario específico.
 * @typedef {import('express').Router} Router
 */
const usuarioRouter = Router();

/**
 * Ruta para obtener la información de un usuario específico por su ID.
 *
 * @name GET /usuario/:id
 * @function
 * @memberof module:UsuarioRouter
 * @inner
 * @param {string} path - La ruta para obtener la información de un usuario por su ID.
 * @param {Function} handler - Controlador para manejar la obtención de información de un usuario específico.
 * @returns {void} - La función no devuelve un valor directamente, sino que se encarga de procesar la solicitud.
 */
usuarioRouter.get("/usuario/:id", traerUsuario);

/**
 * Ruta para modificar la información de un usuario específico por su ID.
 *
 * @name PUT /modificar/:id
 * @function
 * @memberof module:UsuarioRouter
 * @inner
 * @param {string} path - La ruta para modificar la información de un usuario por su ID.
 * @param {Function} handler - Controlador para manejar la modificación de información de un usuario específico.
 * @returns {void} - La función no devuelve un valor directamente, sino que se encarga de procesar la solicitud.
 */
usuarioRouter.put("/modificar/:id", modificarUsuario);

module.exports = usuarioRouter;
