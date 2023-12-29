const { Router } = require('express');
const usRouter = require('./userRouter');
const authRouter = require("./AuthRouter")
const { authenticateToken } = require('../middlewares/jwt');
const isAdmin = require('../middlewares/middlewareAutorizacion');
const usuarioRouter = require('./usuarioRouter');

// Importar todos los routers;
const router = Router();

// Configurar los routers

router.use("/auth", authRouter)

router.use("/users", authenticateToken ,  isAdmin,   usRouter)

router.use("/user", authenticateToken, usuarioRouter)



module.exports = router;