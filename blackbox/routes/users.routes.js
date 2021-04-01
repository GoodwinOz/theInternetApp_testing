const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const Users = require('../models/users.model')
const Posts = require('../models/post.model')

const router = express.Router()

require('dotenv').config()


//User create
router.post('/register', async (req, res) => {
    const { login, nameAndSurname, password, mobileNumber, gender, email, status } = req.body

    try {
        let emailCheck = await Users.findOne({ where: { email }})
        if (emailCheck) { 
            return res.status(400).send('Email is already in use.') 
        }

        const hashedPass = await bcrypt.hash(password, 10)
        const user = await Users.create({
            login, //: req.body.login,
            nameAndSurname, //: req.body.nameAndSurname,
            password: hashedPass,
            mobileNumber, //: req.body.mobileNumber,
            gender, //: req.body.gender,
            email,  //: req.body.email
            status // admin/user/content creator etc. for future validation
        })


        res.status(200).json(user)
    } catch (e) {
        console.log(e)
    }
    
})


//Login user
router.post('/login', async(req, res) => {   
    
    const users = await Users.findOne({
        where: {
        email: req.body.email
        }
    })
    // console.log(users)
    const userData = { id: users.id, email: users.email, login: users.login }

    try {
        const decryptedPass = await bcrypt.compare(req.body.password, users.password)

        const token = await jwt.sign(userData, process.env.SECRET, {
            expiresIn: process.env.EXPIRESIN
        })
        if(decryptedPass) {
            res.header('Authorization', token).json({
                error: null,
                data: {
                    token
                }
            })
        } else {
            res.json({ message: 'Invalid user data' })
        }
    } catch(e) {
        console.log(e)
    }
})


//User findAll
router.get('/', async(req, res) => {
    try {
        const user = await Users.findAll()
        res.status(200).json(user)
    } catch(e) {
        console.log(e)
        // res.status(500).json({ message: 'Server error' })
    }
})

//user findById
router.get('/:id', async(req, res) => {
    try {
        const user = await Users.findByPk(+req.params.id)
        res.status(200).json({user})
    } catch(e) {
        console.log(e)
    }
})


//User update
router.put('/:id', async (req, res) => {
    try {
        const user = await Users.findByPk(+req.params.id)
        user.login = req.body.login
        await user.save()
        res.status(200).json({user})
    } catch (e) {
        console.log(e)
        // res.status(500).json({ message: 'Server error' })
    }
})

//Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
       const users = await Users.findAll({
           where: {
               id: +req.params.id
           }
       })
       const user = users[0]
       await user.destroy()
       res.status(204).json({message: `User with ID = ${user.id} was destroyed`})
    } catch(e) {
        console.log(e)
        // res.status(500).json({ message: 'Server error' })
    }
})



//Find users with posts by ID
router.get('/:id', async(req, res) => {
    const { id } = req.params
    try {
        let users = await users.findAll({
            where: {
                id: id
            },
            include: {
                model: Posts,
                as: 'posts',
                require: false
            }
        })
        if (users.length > 0) {
            res.json({
                result: 'Ok',
                data: users[0],
                message: "Posts listed successfully"
            })
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: 'Can\'t find posts'
            })
        }
    } catch(e) {
        console.log(e)
    }
})



module.exports = router