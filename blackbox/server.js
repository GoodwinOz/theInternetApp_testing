const express = require('express')
const passport = require('passport')
const session = require('express-session')
const path = require('path')

const sequelize = require('./config/db.config')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Test CRUD Api",
            version: "1.0.0",
            description: "A simple Express CRUD Api"
        },
        servers: [
            {
                url: "http://localhost:3000"
            },
        ],
    },
    apis: ["./routes/*.js"]
}
const specs = swaggerJsDoc(options)
const cors = require('cors')
const PORT = process.env.PORT || 3000
const usersRoutes = require('./routes/users.routes')
const postRoutes = require('./routes/post.routes')
const uploadRoutes = require('./routes/file.routes')
const verifyToken = require('./middleware/validate.token')


require('dotenv').config()

const app = express()

app.use(express.static(path.join(__dirname, '/')))
app.use(express.static(path.join(__dirname, '/uploads')))
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false
}))

app.use(express.json())
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())
app.use('/api/users', usersRoutes)
app.use('/api/posts', /*verifyToken,*/ postRoutes) //added verification for *GETting* Posts list
app.use('/api/upload', uploadRoutes)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))



app.get('/', (req, res, next) => {
    res.json({ message: 'Main' })
})


async function start() {
    try {
        await sequelize.sync()
        app.listen(PORT)
    } catch(e) {
        console.log(e)
    }
}

start()

module.exports = app