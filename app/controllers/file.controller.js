const uploadFile = require("../middleware/upload")
const fs = require('fs')
require('dotenv').config()
const uploadDir = process.env.UPLOAD_DIR

const upload = async (req, res) => {
    try {
        console.log(req.file)
        if (req.file == undefined) {
            return res.status(400).send({message: "Please upload a file!"})
        }
        await uploadFile(req, res)

        res.status(200).send({message: "Upload file success!"})
    } catch (err) {
        console.log("ERR", req.file)
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            })
        }
        res.status(500).send({
            message: `Could not upload the file: ${err}`,
        })
    }
}

const getListFiles = (req, res) => {
    const dirPath = __basedir + uploadDir

    fs.readdir(dirPath, function(err, files) {
        if (err) {
            res.status(500).send({
                message: `Unable to scan files`,
            });
        }

        let fileInfos = []
        files.forEach(file => {
            fileInfos.push({
                name: file,
                url: baseUrl + file
            })
        })

        res.status(200).send(fileInfos);
    })
}

const download = (req, res) => {
    const dirPath = __basedir + uploadDir
    const fileName = req.params.name

    res.download(dirPath + fileName, fileName, (err) => {
        if(err) res.status(500).send({ message: "Could not download the file. " + err });
    })
}

module.exports = {
    upload,
    getListFiles,
    download,
}