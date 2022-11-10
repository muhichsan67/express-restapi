const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const db = require('../models')
const User = db.user

function isUserExist(id) {

    return User.findOne({
        where: {
            id: id
        }, attributes: ['id', 'username', 'password', 'name', 'email', 'phone_number',], include: ['role']
    }).then(user => {
        var result = {
            status: false,
            message: '',
            data: user
        };
        if (user) {
            var msg = 'User exists.'
            result.status = true
            result.message = msg
        } else {
            result.message = 'User not found'
        }
        return result
    })
}

verifyToken = (req, res, next) => {
    try {
        let tokenHeaders = req.headers.authorization
        if (tokenHeaders.split(' ')[0] !== 'Bearer') {
            return res.status(403).send({
                status: 'failed',
                message: "Incorrect token format!"
            });
        }

        let token = tokenHeaders.split(' ')[1]
        if (!token) {
            return res.status(403).send({
                status: 'failed',
                message: "No token provided!"
            });
        }
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(403).send({
                    status: 'failed',
                    message: "Unauthorized!"
                });
            }

            req.userId = decoded.id
            next()
        })
    } catch (err) {
        return res.status(500).send({
            status: 'failed',
            message: err.message
        });
    }   
}

isAdmin = (req, res, next) => {
    try {
        let userId = req.userId
        console.log(userId)
        isUserExist(userId).then(result => {
            if (!result.data) {
                result.status = 'failed'
                result.message = response.message
                return res.status(200).send(result)
            }

            if (result.data.role.name !== 'admin') {
                result.data = {}
                result.status = 'failed'
                result.message = 'Unauthorized permission!'
                return res.status(200).send(result) 
            }

            next()
        })
    } catch (err) {
        return res.status(500).send({
            status: 'failed',
            message: err.message
        });
    }
}

isUser = (req, res, next) => {
    try {
        let userId = req.userId
        console.log(userId)
        isUserExist(userId).then(result => {
            if (!result.data) {
                result.status = 'failed'
                result.message = response.message
                return res.status(200).send(result)
            }

            if (result.data.role.name !== 'user') {
                result.data = {}
                result.status = 'failed'
                result.message = 'Unauthorized permission!'
                return res.status(200).send(result) 
            }

            next()
        })
    } catch (err) {
        return res.status(500).send({
            status: 'failed',
            message: err.message
        });
    }
}

isModerator = (req, res, next) => {
    try {
        let userId = req.userId
        console.log(userId)
        isUserExist(userId).then(result => {
            if (!result.data) {
                result.status = 'failed'
                result.message = response.message
                return res.status(200).send(result)
            }

            if (result.data.role.name !== 'moderator') {
                result.data = {}
                result.status = 'failed'
                result.message = 'Unauthorized permission!'
                return res.status(200).send(result) 
            }

            next()
        })
    } catch (err) {
        return res.status(500).send({
            status: 'failed',
            message: err.message
        });
    }
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isUser: isUser
}
module.exports = authJwt