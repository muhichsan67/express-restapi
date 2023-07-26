const util = require('util')
const multer = require('multer')
const maxSize = 2 * 1024 * 1024

require('dotenv').config()
const uploadDir = process.env.UPLOAD_DIR
const path = require("path")

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__basedir, "resources/upload"))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
  })

let uploadFileMiddleware = multer({storage: storage, limits: {fileSize: maxSize}}).single('file')

module.exports = uploadFileMiddleware