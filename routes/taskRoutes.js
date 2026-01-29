const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskControllers')
const { ValidateToken } = require('../middleware/auth.middleware')

router.get('/', ValidateToken, taskController.getTasks)
router.post('/tasks', ValidateToken, taskController.createTask) 
router.get('/tasks/:id/complete', ValidateToken, taskController.completeTask)
router.get('/tasks/:id/delete', ValidateToken, taskController.deleteTask)

module.exports = router;