const { DataTypes } = require("sequelize");
const db = require("../db/database");

/**
 * Definición del modelo Usuario.
 * @typedef {import("sequelize").Model} Model
 * @typedef {import("sequelize").DataTypes} DataTypes
 * @property {string} nombre - Nombre del usuario.
 * @property {string} apellido - Apellido del usuario.
 * @property {Date} fechaNacimiento - Fecha de nacimiento del usuario.
 * @property {string} dni - Número de identificación del usuario.
 * @property {string} email - Correo electrónico del usuario.
 * @property {string} contrasena - Contraseña del usuario.
 * @property {string} fotoPerfil - Ruta o enlace a la foto de perfil del usuario.
 * @property {boolean} activo - Indicador de si el usuario está activo o no.
 * @property {("admin" | "usuario")} rol - Rol del usuario, puede ser 'admin' o 'usuario'.
 */
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
