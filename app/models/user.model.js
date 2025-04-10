

module.exports = (sequelize, Sequelize) => {
    const Role = require('./role.model.js')
    const User = sequelize.define("users", {
        role_code: {
            type: Sequelize.STRING,
        },
        username: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        phone_number: {
            type: Sequelize.STRING,
        },
        join_date: {
            type: Sequelize.DATE
        }
    })

    return User
}