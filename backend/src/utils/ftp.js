const ftp = require("basic-ftp");

/**
 * Conecta a un servidor FTP y devuelve el cliente FTP para realizar operaciones.
 *
 * @async
 * @function
 * @memberof module:FTP
 * @throws {Error} - Se lanza un error si la conexión al servidor FTP falla.
 * @returns {ftp.Client} - Cliente FTP conectado.
 */
async function connectToFTP() {
    const client = new ftp.Client();
    try {
        await client.access({
            host: "127.0.0.1",
            user: "danidev",
            password: "prueba123",
            port: 21
        });
        return client;
    } catch (error) {
        console.error("Error connecting to FTP:", error);
        throw error;
    }
}

/**
 * Sube un archivo al servidor FTP.
 *
 * @async
 * @function
 * @memberof module:FTP
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @throws {Error} - Se lanza un error si la conexión al servidor FTP falla o si hay un error al subir el archivo.
 * @returns {void} - La función no devuelve un valor directamente, sino que se encarga de procesar la solicitud.
 */
async function uploadFile(req, res) {
    try {
        const client = await connectToFTP();
        await client.uploadFrom(req.file.path, "/fotos/" + req.file.originalname);
    } catch (error) {
        console.error("Error al subir el archivo:", error);
        res.status(500).json({ error: "Error al subir el archivoxxx" });
    }
}

module.exports = {
    uploadFile,
    connectToFTP
};
