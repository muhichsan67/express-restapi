const util = require('util')
const multer = require('multer')
const maxSize = 2 * 1024 * 1024

require('dotenv').config()
const uploadDir = process.env.UPLOAD_DIR

let directory = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + uploadDir)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

let uploadFile = multer({storage: directory, limits: {fileSize: maxSize}}).single('file')

let uploadFileMiddleware = util.promisify(uploadFile)
module.exports = uploadFileMiddleware