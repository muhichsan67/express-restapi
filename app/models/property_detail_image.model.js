module.exports = (sequelize, Sequelize) => {
    const PropertyDetailImage = sequelize.define("properties_detail_image", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        property_id: {
            type: Sequelize.INTEGER
        },
        image: {
            type: Sequelize.STRING
        },
        sequence: {
            type: Sequelize.INTEGER
        }
    })

    return PropertyDetailImage
}