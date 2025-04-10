module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        code: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
        }
    })

    return Role
}