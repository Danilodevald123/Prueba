const {Sequelize} = require ("sequelize")


const db = new Sequelize('prueba', 'root', 'Prueba123', {
    host: 'localhost',
    dialect: 'mysql',
    /* one of | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });


  module.exports = db;