const Joi = require('joi')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

// Register validation
const ValidateRegisterUser = (req, res, next) => {
    const userSchema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })

    const { error } = userSchema.validate(req.body)
    if(error) return res.render('register', { error: error.message })

    next()
}

// Login Validation
const ValidateLoginUser = (req, res, next) => {
    const userSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })

    const { error } = userSchema.validate(req.body )
    if(error) return res.render('login', { error: error.message })
    
    next()
}

// JWT authentication
const ValidateToken = (req, res, next) =>  {
    const token = req.cookies.token
    if(!token) return res.redirect('/login')

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch (error) {
        return res.redirect('/login')
    }
}

module.exports = {
    ValidateRegisterUser,
    ValidateLoginUser,
    ValidateToken
}
