const { Router } = require('express');
const { sso } = require('../controllers/AuthController');

const authRouter = Router();

const multer = require('multer');
const upload = multer({ dest: '/fotos' });


authRouter.post("/sso", upload.single('fotoPerfil'), sso );


module.exports = authRouter;