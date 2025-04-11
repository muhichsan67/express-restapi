

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role_code: {
            type: Sequelize.STRING,
            references: {
              model: 'roles',
              key: 'code'
            }
        },
        username: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
            references: {
              model: 'transactions',
              key: 'transaction_code'
            }
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