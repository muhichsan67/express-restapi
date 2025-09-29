module.exports = (sequelize, Sequelize) => {
    // Define associations for property_id and property_type
    // Associations should be defined in the main index.js or after all models are initialized
    // Example:
    const PropertyDetailType = sequelize.define("properties_detail_type", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        property_id: {
            type: Sequelize.INTEGER
        },
        property_type_id: {
            type: Sequelize.INTEGER
        }
    })


    return PropertyDetailType
}