const jwt = require('jsonwebtoken')
require('dotenv').config()


function verifyToken (req, res, next) {
    const token = req.header('Authorization').split(' ')[1]
    if (token[0] !== 'Bearer') return res.status(401).json({ error: 'Access denied' })

    try {
        const verified = jwt.verify(token[1], process.env.SECRET)
        req.user = verified
        next()
    } catch(e) {
        res.status(400).json({ error: 'Token is not valid' })
    }
}

module.exports = verifyToken