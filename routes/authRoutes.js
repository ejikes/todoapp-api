const express = require('express')
const router = express.Router()
const authController = require('../middleware/auth.Controller')
const {
    ValidateRegisterUser,
    ValidateLoginUser
} = require('../middleware/auth.middleware')

router.get('/register', authController.registerPage)
router.post('/register', ValidateRegisterUser, authController.register)

router.get('/login', authController.loginPage)
router.post('/login', ValidateLoginUser, authController.login)

router.get('/logout', authController.logout)

module.exports = router