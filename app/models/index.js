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
db.propertyType = require('./property_type.model.js')(sequelize, Sequelize)
db.user = require('./user.model.js')(sequelize, Sequelize)
db.property = require('./property.model.js')(sequelize, Sequelize)
db.propertyDetailType = require('./property_detail_type.model.js')(sequelize, Sequelize)
db.propertyDetailImage = require('./property_detail_image.model.js')(sequelize, Sequelize)


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


// db.propertyDetailType.belongsTo(db.property, {
//     foreignKey: 'property_id',
//     targetKey: 'id',
//     as: 'property_type'
// })
db.propertyDetailType.belongsTo(db.propertyType, {
    foreignKey: 'property_type_id',
    targetKey: 'id',
    as: 'property_type'
})
db.property.hasMany(db.propertyDetailType, {
    foreignKey: 'id',
    targetKey: 'property_id',
    as: 'types'
})
db.property.hasMany(db.propertyDetailImage, {
    foreignKey: 'id',
    targetKey: 'property_id',
    as: 'images'
})


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

db.ROLES = ['admin', 'user']
module.exports = db