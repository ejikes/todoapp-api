const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const path =require('path')

require('dotenv').config()

const authRouters = require('./routes/authRoutes')
const taskRouters = require('./routes/taskRoutes')
const errorHandler = require('./middleware/errorMiddleware')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', authRouters)
app.use('/', taskRouters)


    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))


module.exports = app