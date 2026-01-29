const Task = require('../models/task')
const User = require('../models/user')

exports.getTasks = async (req, res) => {
    try{
    const tasks = await Task.find({user: req.userId, status: {$ne: 'deleted'}})
    const user = await User.findById(req.userId)

    res.render('index', { tasks, user })
    } catch(err){
        console.log(err)
        res.status(500).send('Error loading tasks')
    }
}

exports.createTask = async (req, res) => {
    try{
    await Task.create({title: req.body.title, user: req.userId })
    res.redirect('/')
    } catch(err){
       next(err)
    }
}

exports.completeTask = async (req, res) => {
    try{
    await Task.findByIdAndUpdate(req.params.id, {status: 'completed'})
    res.redirect('/')
    } catch(err){
        console.log(err)
        res.status(500).send('Error completing task')
    }
}

exports.deleteTask = async (req, res) => {
    try{
    await Task.findByIdAndUpdate(req.params.id, {status: 'deleted'})
    res.redirect('/')
    } catch(err){
        res.status(500).send("Error deleting task")
    }
}