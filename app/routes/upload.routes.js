const controller = require('../controllers/file.controller')
const multer = require("multer")
const path = require("path")
const { uploadFileMiddleware } = require('../middleware')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__basedir, "resources/upload"))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
  })

module.exports = function(app) {
    // app.post('/api/file/upload',  multer({ storage: storage }).single("file"), controller.upload)
    
    app.post('/api/file/upload', uploadFileMiddleware, controller.upload)
    app.get('/api/file/list', controller.getListFiles)
    app.get('/api/file/download/:name', controller.download)
}