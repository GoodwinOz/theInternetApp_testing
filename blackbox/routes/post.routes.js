const express = require('express')
const Posts = require('../models/post.model')
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - text
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the post
 *         title:
 *           type: string
 *           description: The post title
 *         text:
 *           type: string
 *           description: The post's text
 *       example:
 *         id: 333
 *         title: "Example swagger title"
 *         text: "Example swagger text" 
 */


/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new Post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The Post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Post server error
 */

//Create post
router.post('/', async (req, res) => {
    try {
        const post = await Posts.create({
            userID: req.body.userID,
            title: req.body.title,            
            text: req.body.text
        })
        res.status(200).json(post)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Post server error' })
    }
})

/**
 * @swagger
 * /api/posts:
 *   get:
 *      summary: Returns the list of all posts
 *      tags: [Posts]
 *      responses:
 *        200:
 *          description/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Post'
 * 
 */

//Post findAll
router.get('/', async(req, res) => {
    try {
        const post = await Posts.findAll()
        res.status(200).json(post)
    } catch(e) {
        console.log(e)
        res.status(500).json({ message: ' GetAll server error' })
    }
})

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get the post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: The post description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: The Post was not found
 */

// Post findById
router.get('/:id', async(req, res) => {
    try {
        // console.log('REQ PARAM ID', req.params.id) //DEBUG console
        const post = await Posts.findByPk(+req.params.id)
        res.status(200).json(post)
    } catch(e) {
        // if(!post) return res.status(404).send('Post with such ID was not created')
        console.log(e)
        res.status(500).json({ message: 'getById server error' })
    }
})

/**
 * @swagger
 *   /api/posts/{id}:
 *     put:
 *       summary: Update the post by id
 *       tags: [Posts]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema: 
 *             type: string
 *           required: true
 *           description: The post id
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       responses:
 *         200:
 *           description: The post was updated
 *           content: 
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Post'
 *         500:
 *           description: Some server error
 */

//Post update
router.put('/:id', async (req, res) => {
    try {
        const post = await Posts.findByPk(+req.params.id)
        post.title = req.body.title
        await post.save()
        res.status(200).json(post)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Put server error' })
    }
})

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Remove the post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 * 
 *     responses:
 *       200:
 *         description: The post was deleted
 *       500:
 *         description: Some server error occured
 */

//Delete post by ID
router.delete('/:id', async (req, res) => {
    try {
       const post = await Posts.findAll({
           where: {
               id: +req.params.id
           }
       })
       const postDel = post[0] //May be an error
       await postDel.destroy()
       res.status(204).json({})
    } catch(e) {
        console.log(e)
        res.status(500).json({ message: 'Delete server error' })
    }
})

module.exports = router