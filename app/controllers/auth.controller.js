const db = require('../models')
const config = require('../config/auth.config')
const User = db.user
const Role = db.role

const Op = db.Sequelize.Op
var jwt = require('jsonwebtoken')
var bcrypt = require("bcryptjs")
const { user } = require('../models')
var _template_return = {status: '', message: '', data: []}

function isUserExist(username, email, phone_number, id) {
    var where_condition = [];
    if (username) where_condition.push({username: username})
    if (email) where_condition.push({email: email})
    if (phone_number) where_condition.push({phone_number: phone_number})
    if (id) where_condition.push({id: id})

    return User.findOne({
        where: {
            [Op.or]: where_condition
        }, attributes: ['id', 'username', 'password', 'name', 'email', 'phone_number',], include: ['role']
    }).then(user => {
        var result = {
            status: false,
            message: '',
            data: user
        };
        if (user) {
            var msg = 'User already registered.'
            if (user.username == username) {
                msg = 'Username already registered.'
            } else if (user.email == email) {
                msg = 'Email already registered.'
            } else if (user.phone_number == phone_number) {
                msg = 'Phone number already registered.'
            }
            result.status = true
            result.message = msg
        } else {
            result.message = 'User not found'
        }
        return result
    })
}

exports.signUp = (req,res) => {
    result = _template_return
    isUserExist(req.body.username, req.body.email, req.body.phone_number).then(user => {
        if (user.status) {
            result.status = 'failed'
            result.message = user.message
            return res.status(200).send(result)
        }

        User.create({
            username: req.body.username,
            email: req.body.email,
            name: req.body.name,
            phone_number: req.body.phone_number,
            join_date: new Date(),
            password: bcrypt.hashSync(req.body.password, 8)
        }).then(user => {
            if (req.body.role) {
                Role.findOne({
                    where: {
                        name: req.body.role
                    }
                }).then(role => {
                    user.setRole(role.id).then(() => {
                        return res.status(200).send({message: "User successfully created!"})
                    })
                })
            } else {
                user.setRole(1).then(() => {
                    return res.status(200).send({message: "User successfully created!"})
                })
            }
        }).catch(err => {
            res.status(500).send({ message: err.message })
        })
    }).catch(err => {
        result.status = 'failed'
        result.message = err.message
        res.status(500).send(result)
    })

}

exports.signIn = (req, res) => {
    isUserExist(req.body.username).then(response => {
        result = _template_return
        if (!req.body.username || !req.body.password) {
            result.status = 'failed'
            result.message = 'Username or password is empty!'
            return res.status(200).send(result)
        }
        
        var user = response.data
        if (!user) {
            result.status = 'failed'
            result.message = response.message
            return res.status(200).send(result)
        }

        var passwordValidation = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordValidation) {
            result.status = 'failed'
            result.message = 'Incorrect password!'
            return res.status(200).send(result)
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.expires_token // 24 hours
        });
        
        var user_return = {
            username: user.username,
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
            role: user.role.name,
            token: token,
            expiresInSeconds: config.expires_token
        }

        result.status = 'success'
        result.message = 'Sign in success!'
        result.data = user_return
        return res.status(200).send(result)
    })
}

exports.allRole = (req, res) => {
    Role.findAll({
       include: ['user']
    }).then(roles => {
        console.log(roles)
        return res.status(200).send(roles)
    })
}