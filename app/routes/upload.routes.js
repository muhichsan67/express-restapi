const controller = require('../controllers/file.controller')

module.exports = function(app) {
    app.post('/api/file/upload', controller.upload)
    app.get('/api/file/list', controller.getListFiles)
    app.get('/api/file/download/:name', controller.download)
}