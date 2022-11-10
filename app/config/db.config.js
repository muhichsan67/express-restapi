require('dotenv').config()
const env = process.env
module.exports = {
    HOST : env.DB_HOST,
    USERNAME : env.DB_USERNAME,
    PASSWORD : env.DB_PASSWORD,
    DB : env.DB,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}