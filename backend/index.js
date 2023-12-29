const express = require("express");
const routes = require("./src/routes/index");
const app = express();
const cors = require("cors");
const db = require("./src/db/database");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const port = 3030;

// Definir una función asincrónica para inicializar la aplicación
const initializeApp = async () => {
  try {
    await db.authenticate();
    await db.sync();


    app.use(cors());
    app.use(cookieParser());
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan('dev'));
    app.use("/", routes); 

    app.use((err, req, res, next) => {
      // eslint-disable-line no-unused-vars
      const status = err.status || 500;
      const message = err.message || err;
      console.error(err);
      res.status(status).send(message);
    });
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  
  } catch (error) {
    throw new Error(error);
  }
};

// Llamar a la función de inicialización
initializeApp();
