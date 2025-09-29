module.exports = (sequelize, Sequelize) => {
    const Property = sequelize.define("properties", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        property_date: {
            type: Sequelize.DATEONLY,
        },
        property_code: {
            type: Sequelize.STRING,
        },
        slug: {
            type: Sequelize.STRING,
        },
        title: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        size: {
            type: Sequelize.STRING,
        },
        amount: {
            type: Sequelize.STRING,
        },
        cover: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
    })

    return Property
}