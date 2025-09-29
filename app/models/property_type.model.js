module.exports = (sequelize, Sequelize) => {
    const PropertyType = sequelize.define("property_type", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: Sequelize.STRING,
            unique: true
        },
        name: {
            type: Sequelize.STRING,
        },
    })

    return PropertyType
}