const { DataTypes } = require("sequelize");
const db = require("../db/database");

const Usuario = db.define("Usuario", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fotoPerfil: {
        type: DataTypes.STRING, // Puedes almacenar la ruta del archivo en el servidor o el enlace a la imagen.
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    rol: {
        type: DataTypes.ENUM("admin", "usuario"),
        defaultValue: "usuario",
    },
});

module.exports = Usuario;