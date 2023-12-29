const { Router } = require('express');
const { traerUsuario, modificarUsuario } = require('../controllers/UserController');
const usuarioRouter = Router();


usuarioRouter.put("/modificar/:id", modificarUsuario);
usuarioRouter.get("/usuario/:id", traerUsuario );


module.exports = usuarioRouter;