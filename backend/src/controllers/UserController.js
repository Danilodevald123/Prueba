
const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");
const path = require("path")
const {connectToFTP} = require("../utils/ftp")


const traerUsuarios = async (req, res) => {
    try {
        // Modificación para obtener solo los usuarios activos
        const usuarios = await Usuario.findAll({
            where: {
                activo: true,
            },
        });

        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error interno del servidor",
        });
    }
};

const traerUsuario =  async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const usuario = await Usuario.findByPk(id);
    res.json(usuario);
};

const modificarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nombre,
            apellido,
            fechaNacimiento,
            dni,
            email,
            contrasena,
            fotoPerfil,
            rol
        } = req.body;

        // Validación de campos obligatorios
        if (!nombre || !apellido || !fechaNacimiento || !dni || !email) {
            return res.status(400).json({
                error: "Campos obligatorios incompletos",
            });
        }

   
        let hashedPassword;
        if (contrasena) {
            hashedPassword = await bcrypt.hash(contrasena, 10);
        }

        // Actualización de usuario en la base de datos
        const result = await Usuario.update(
            {
                nombre,
                apellido,
                fechaNacimiento,
                dni,
                email,
                contrasena: hashedPassword,
                fotoPerfil,
                rol
            },
            {
                where: { id },
            }
        );

        if (result[0]) {
            res.status(200).json({ message: "Usuario modificado exitosamente" });
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error interno del servidor",
        });
    }
};

const desactivarUsuario = async (req, res) => {
  try {
      const { id } = req.params;
      // Desactivar el usuario en la base de datos
      const result = await Usuario.update(
          { activo: false },
          { where: { id } }
      );

      if (result[0]) {
          res.status(200).json({ message: "Usuario desactivado exitosamente" });
      } else {
          res.status(404).json({ error: "Usuario no encontrado" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({
          error: "Error interno del servidor",
      });
    }
};

const activarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        // Desactivar el usuario en la base de datos
        const result = await Usuario.update(
            { activo: true },
            { where: { id } }
        );
  
        if (result[0]) {
            res.status(200).json({ message: "Usuario activado exitosamente" });
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error interno del servidor",
        });
    }
};

module.exports = {
    traerUsuarios,
    traerUsuario,
    modificarUsuario,
    desactivarUsuario,
    activarUsuario
}