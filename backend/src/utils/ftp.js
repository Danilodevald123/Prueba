const ftp = require("basic-ftp");

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



async function uploadFile(req, res) {
    console.log(req)
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


