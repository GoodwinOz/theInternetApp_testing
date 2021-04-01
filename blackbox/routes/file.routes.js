const express = require('express')
const Upload = require('../models/file.models')
const uploadFile = require('../middleware/file')
const router = express.Router()

router.post('/', uploadFile.single('file'), async (req, res) => {
    try {
        const upload = await Upload.create({
            type: req.body.type,
            name: req.file.originalname,
            url: req.file.path
        })
        
        res.status(200).json(upload)
    } catch (e) {
        console.log(e)
        // res.status(500).json({ message: 'Server error' })
    }
})

module.exports = router