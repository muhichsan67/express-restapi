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

db.role = require('./role.model.js')(sequelize, Sequelize)
db.transactionType = require('./transaction_type.model.js')(sequelize, Sequelize)
db.user = require('./user.model.js')(sequelize, Sequelize)
db.transaction = require('./transaction.model.js')(sequelize, Sequelize)


db.user.belongsTo(db.role, {
    foreignKey: 'role_code',
    targetKey: 'code',
    as: 'role'
})
db.role.hasMany(db.user, {
    foreignKey: 'code',
    targetKey: 'role_code',
    as: 'users'
})


// db.transaction.belongsTo(db.user, {
//     foreignKey: 'user_id',
//     targetKey: 'id',
//     as: 'user'
// })
// db.user.hasMany(db.transaction, {
//     foreignKey: 'id',
//     targetKey: 'user_id',
//     as: 'transactions'
// })


// db.transaction.belongsTo(db.transaction, {
//     foreignKey: 'transaction_code',
//     targetKey: 'trans_code',
//     as: 'category'
// })
// db.transactionType.hasMany(db.transaction, {
//     foreignKey: 'trans_code',
//     targetKey: 'transaction_code',
//     as: 'transactions'
// })

db.ROLES = ['user', 'admin', 'moderator']
module.exports = db