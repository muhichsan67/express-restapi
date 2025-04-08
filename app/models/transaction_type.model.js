module.exports = (sequelize, Sequelize) => {
    const TransactionType = sequelize.define("transaction_type", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        code: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
        },
    })

    return TransactionType
}