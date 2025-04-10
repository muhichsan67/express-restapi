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
const TransactionType = db.transactionType



var bcrypt = require("bcryptjs")
if (process.env.IS_RESYNC) {
    db.sequelize.sync({force: true}).then(() => {
        // console.log('Drop and Resync DB')
        insertMasterData()
        initial()
    })
} else {
    db.sequelize.sync({alter: true}).then(() => {
        console.log('Drop and Resync DB')
        insertMasterData()
    })
}

function initial() {
    Role.create({
        code: "admin",
        name: "Administrator"
    })

    Role.create({
        code: "user",
        name: "Pengguna"
    })

    User.create({
        username: 'admin123',
        password: bcrypt.hashSync('123456', 8),
        name: 'Admin 1',
        email: 'admin1@gmail.com',
        phone_number: 62831231999,
        join_date: new Date(),
        role_code: "admin"
    })

    User.create({
        username: 'sanfatur30',
        password: bcrypt.hashSync('123456', 8),
        name: 'Muhammad Ichsan Fathurrochman',
        email: 'nomail@gmail.com',
        phone_number: 6283807164451,
        join_date: new Date(),
        role_code: "user"
    })

    User.create({
        username: 'tsymd13',
        password: bcrypt.hashSync('123456', 8),
        name: 'Tasya Melati Dewi',
        email: 'nomail@gmail.com',
        phone_number: 6289609532748,
        join_date: new Date(),
        role_code: "user"
    })

}

function insertMasterData() {
    TransactionType.create({
        code: "gaji",
        type: "I",
        name: "Gaji"
    })

    TransactionType.create({
        code: "hutang",
        type: "O",
        name: "Hutang"
    })

    TransactionType.create({
        code: "transportasi",
        type: "O",
        name: "Transportasi"
    })

    TransactionType.create({
        code: "kopi",
        type: "O",
        name: "Kopi"
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