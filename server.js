require('dotenv').config()


const port = process.env.APP_PORT
global.__basedir = __dirname
global.baseUrl = `http://localhost:${port}/`

const express   = require('express')
const cors      = require('cors')
const app       = express()

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'My API',
        version: '1.0.0',
        description: 'A simple Express API with Swagger',
        },
        servers: [
        {
            url: global.baseUrl,
        },
        ],
    },
    apis: ['./app/routes/*.js'], // arahkan ke file yang berisi dokumentasi API-mu
};



var corsOptions = {
    origin: baseUrl
}

const swaggerSpec = swaggerJsdoc(swaggerOptions);
console.log('SWAGGER ', swaggerSpec.paths);

// Endpoint untuk Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors(corsOptions))

const db = require('./app/models')
const Role = db.role
const User = db.user



var bcrypt = require("bcryptjs")
db.sequelize.sync({force: process.env.IS_RESYNC}).then(() => {
    // console.log('Drop and Resync DB')
    if (process.env.IS_RESYNC) initial()
})

function initial() {
    Role.create({
        id: 1,
        name: "user"
    })

    Role.create({
        id: 2,
        name: "moderator"
    })

    Role.create({
        id: 3,
        name: "admin"
    })

    User.create({
        username: 'user123',
        password: bcrypt.hashSync('123456', 8),
        name: 'User 1',
        email: 'user1@gmail.com',
        phone_number: 62831231221,
        join_date: new Date(),
        role_id: 1
    })
    User.create({
        username: 'mod123',
        password: bcrypt.hashSync('123456', 8),
        name: 'Moderator 1',
        email: 'mod1@gmail.com',
        phone_number: 62831231331,
        join_date: new Date(),
        role_id: 2
    })
    User.create({
        username: 'admin123',
        password: bcrypt.hashSync('123456', 8),
        name: 'Admin 1',
        email: 'admin1@gmail.com',
        phone_number: 62831231999,
        join_date: new Date(),
        role_id: 3
    })
}

app.get("/", (req, res) => {
    res.json({message: "Welcome to RESTful API Express JWT MySQL"})
})

// server.js
const userRoutes = require('./app/routes/user.routes');
app.use('/api/test', userRoutes); // Ini baru bisa jalan kalau pakai router

require('./app/routes/auth.routes')(app)
require('./app/routes/upload.routes')(app)
app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})