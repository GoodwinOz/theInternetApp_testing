const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const Users = require('../models/users.model')
const Posts = require('../models/post.model')

const router = express.Router()

require('dotenv').config()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - login
 *         - nameAndSurname
 *         - password
 *         - mobileNumber
 *         - gender
 *         - email
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         login:
 *           type: string
 *           description: User's login
 *         nameAndSurname:
 *           type: string
 *           description: User's name and surname
 *         password:
 *           type: string
 *           description: User's hashed pass
 *         mobileNumber:
 *           type: string
 *           description: User's mobile number
 *         gender:
 *           type: string
 *           description: User's gender
 *         email:
 *           type: string
 *           description: User's email
 *         status:
 *           type: string
 *           description: user's status
 *       example:
 *         id: 333
 *         login: "RedrickTest"
 *         nameAndSurname: "Redrick Reed" 
 *         password: "aSDAFsasdwqQW1223344Aasdgfgvb" 
 *         mobileNumber: "=380678912122" 
 *         gender: "Male" 
 *         email: "testRedrick@gmail.com" 
 *         status: "Admin"
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: User server error
 *       400:
 *         description: Email is already in use.
 */

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
        res.status(500).json({ message: 'Server error in proceff of user creation' })
    }
    
})


//Login user
router.post('/login', async(req, res) => {   
    
    const users = await Users.findOne({
        where: {
        email: req.body.email
        }
    })
    const userData = { id: users.id, email: users.email, login: users.login }

    try {
        const decryptedPass = await bcrypt.compare(req.body.password, users.password)

        const token = await jwt.sign(userData, process.env.SECRET, {
            expiresIn: process.env.EXPIRESIN
        })
        if(decryptedPass) {
            res.header('Authorization', token).json({
                error: null,
                token
            })
        } else {
            res.json({ message: 'Invalid user data' })
        }
    } catch(e) {
        console.log(e)
        res.status(500).json({ message: 'Server error in process of user login' })
    }
})

/**
 * @swagger
 * /api/users:
 *   get:
 *      summary: Returns the list of all users
 *      tags: [Users]
 *      responses:
 *        200:
 *          description/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/User'
 *        500:
 *          description: User server error
 * 
 */

//User findAll
router.get('/', async(req, res) => {
    try {
        const user = await Users.findAll()
        res.status(200).json(user)
    } catch(e) {
        console.log(e)
        res.status(500).json({ message: 'Server error in process of users.findAll' })
    }
})

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

//user findById
router.get('/:id', async(req, res) => {
    try {
        const user = await Users.findByPk(+req.params.id)
        res.status(200).json({user})
    } catch(e) {
        console.log(e)
    }
})

/**
 * @swagger
 *   /api/users/{id}:
 *     put:
 *       summary: Update the user by id
 *       tags: [Users]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema: 
 *             type: string
 *           required: true
 *           description: The user id
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         200:
 *           description: The user was updated
 *           content: 
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         500:
 *           description: Server error shile changing user info (router.put)
 */

//User update
router.put('/:id', async (req, res) => {
    try {
        const user = await Users.findByPk(+req.params.id)
        user.login = req.body.login
        await user.save()
        res.status(200).json({user})
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Server error shile changing user info (router.put)' })
    }
})

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 * 
 *     responses:
 *       200:
 *         description: The user was deleted
 *       500:
 *         description: Server error while deleting a user
 */

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
        res.status(500).json({ message: 'Server error while deleting a user' })
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
        res.status(500).json({ message: 'Server error while getting a user by id' })
    }
})

module.exports = router