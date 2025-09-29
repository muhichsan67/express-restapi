require('dotenv').config()


const port = process.env.APP_PORT
global.__basedir = __dirname
global.baseUrl = `http://localhost:${port}/`

const express   = require('express')
const cors      = require('cors')
const app       = express()


var corsOptions = {
    origin: baseUrl
}


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors(corsOptions))

const db = require('./app/models')
const Role = db.role
const User = db.user
const Property = db.property
const PropertyType = db.propertyType



var bcrypt = require("bcryptjs")
if (process.env.IS_RESYNC) {
    // db.sequelize.sync({force: true}).then(() => {
    //     // console.log('Drop and Resync DB')
    //     insertMasterData()
    //     initial()
    // })
} else {
    // db.sequelize.sync({alter: true}).then(() => {
    //     console.log('Drop and Resync DB')
    //     insertMasterData()
    // })
}

function initial() {
    Role.create({
        code: "admin",
        name: "Administrator"
    })

    Role.create({
        code: "user",
        name: "User"
    })

    User.create({
        username: '999999',
        password: bcrypt.hashSync('111111', 8),
        name: 'Superadmin IT',
        email: 'adminit@cj.net',
        role_code: "admin"
    })

}

function insertMasterData() {
    PropertyType.create({
        type: "tanah",
        name: "Tanah"
    })

    PropertyType.create({
        type: "ruko",
        name: "Ruko"
    })

    PropertyType.create({
        type: "bangunan",
        name: "Bangunan"
    })
}

app.get("/", (req, res) => {
    res.json({message: "Welcome to RESTful API Express JWT MySQL"})
})

// server.js
const userRoutes = require('./app/routes/user.routes');
const frontendRoutes = require('./app/routes/frontend.routes');
app.use('/api/', frontendRoutes); // Ini baru bisa jalan kalau pakai router

require('./app/routes/auth.routes')(app)
require('./app/routes/upload.routes')(app)
app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})