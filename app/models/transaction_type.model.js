module.exports = (sequelize, Sequelize) => {
    const TransactionType = sequelize.define("transaction_type", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        trans_code: {
            type: Sequelize.STRING,
            unique: true
        },
        trans_type: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
        },
    })

    return TransactionType
}