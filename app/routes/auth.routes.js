const controller = require('../controllers/auth.controller')

module.exports = function(app) {
    app.post('/api/auth/signin', controller.signIn)
    app.post('/api/auth/signup', controller.signUp)
    app.get('/api/auth/allrole', controller.allRole)
}