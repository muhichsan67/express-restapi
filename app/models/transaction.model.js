module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transactions", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        transaction_date: {
            type: Sequelize.DATEONLY,
        },
        transaction_code: {
            type: Sequelize.STRING,
            references: {
                model: 'users',
                key: 'name'
            }
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
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
    })

    return Transaction
}