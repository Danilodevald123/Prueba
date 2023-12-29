const { Router } = require('express');
const { traerUsuarios, desactivarUsuario, activarUsuario } = require('../controllers/UserController');



const usRouter = Router();

usRouter.get("/usuarios", traerUsuarios);
/* usRouter.put("/modificar/:id", modificarUsuario);
usRouter.get("/usuario/:id", traerUsuario ); */
usRouter.put('/desactivar/:id', desactivarUsuario);
usRouter.put('/activar/:id', activarUsuario);




module.exports = usRouter;