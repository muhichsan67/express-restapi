const config = require('../config/db.config')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.DB, config.USERNAME, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    operatorAliases: false,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
    }
})

const db = []
db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./user.model.js')(sequelize, Sequelize)
db.role = require('./role.model.js')(sequelize, Sequelize)

db.role.hasMany(db.user, {
    foreignKey: 'role_id',
    as: 'user'
})
db.user.belongsTo(db.role, {
    foreignKey: 'role_id',
    as: 'role'
})

db.ROLES = ['user', 'admin', 'moderator']
module.exports = db