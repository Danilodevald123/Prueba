const { Sequelize } = require("sequelize");

/**
 * Instancia de Sequelize que representa la conexión a la base de datos.
 * @type {Sequelize}
 */
const db = new Sequelize('prueba', 'root', 'Prueba123', {
    host: 'localhost',
    dialect: 'mysql',
    /* one of | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

module.exports = db;