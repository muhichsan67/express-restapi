module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transactions", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        transaction_date: {
            type: Sequelize.DATEONLY,
        },
        type: {
            type: Sequelize.STRING(1),
        },
        title: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        amount: {
            type: Sequelize.STRING,
        }
    })

    return Transaction
}