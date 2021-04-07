const express = require('express')
const Posts = require('../models/post.model')
const router = express.Router()

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