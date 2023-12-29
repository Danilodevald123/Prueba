const { uploadFile } = require("../utils/ftp");


async function subirArchivo(req, res) {
  try {
    await uploadFile(req, res);
  } catch (error) {
    console.error("Error al subir el archivoxxx:", error);
    res.status(500).json({ error: "Error al subir el archivo" });
  }
}

module.exports = { subirArchivo };