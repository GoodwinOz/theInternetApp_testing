const express = require('express')
const passport = require('passport')
const session = require('express-session')
const path = require('path')

const sequelize = require('./config/db.config')
const app = express()
const PORT = process.env.PORT || 3000
const usersRoutes = require('./routes/users.routes')
const postRoutes = require('./routes/post.routes')
const uploadRoutes = require('./routes/file.routes')
const verifyToken = require('./middleware/validate.token')


require('dotenv').config()


app.use(express.static(path.join(__dirname, '/')))
app.use(express.static(path.join(__dirname, '/uploads')))
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false
}))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
app.use('/api/users', usersRoutes)
app.use('/api/posts', /*verifyToken,*/ postRoutes) //added verification for *GETting* Posts list
app.use('/api/upload', uploadRoutes)



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