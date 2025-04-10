module.exports = (sequelize, Sequelize) => {
    const TransactionType = sequelize.define("transaction_type", {
        trans_code: {
            type: Sequelize.STRING,
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