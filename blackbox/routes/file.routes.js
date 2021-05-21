const express = require('express')
const Upload = require('../models/file.models')
const uploadFile = require('../middleware/file')
const router = express.Router()

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     File:
//  *       type: string
//  *       required:
//  *         - id
//  *         - type
//  *         - name
//  *         - url
//  *       properties:
//  *         id:
//  *           type: integer
//  *           description: The auto-generated id of the file
//  *         type:
//  *           type: string
//  *           description: Image type
//  *         name:
//  *           type: string
//  *           description: Name of the image
//  *         url:
//  *           type: string
//  *           description: Url of the image
//  *       example:
//  *         id: 333
//  *         type: "Image"
//  *         name: "image-2021.05.21.jpg" 
//  *         url: "example url" 
//  */

// /**
//  * @swagger
//  * /api/upload:
//  *   post:
//  *     summary: Upload a new File
//  *     tags: [Files]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         image/jpg:
//  *           schema:
//  *             $ref: '#/components/schemas/File'
//  *     responses:
//  *       200:
//  *         description: The File was successfully uploaded
//  *         content:
//  *           multipart/form-data:
//  *             schema:
//  *               $ref: '#/components/schemas/File'
//  *       500:
//  *         description: Server error in process of uploading file
//  */

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
        res.status(500).json({ message: 'Server error in process of uploading file' })
    }
})

module.exports = router