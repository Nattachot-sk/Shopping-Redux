const express =require('express')
const router = express.Router()
const userController = require("../controllers/user.controller")

router.post('/register', userController.registerUser)
router.post('/login', userController.LoginUser)
router.get('/user/:id', userController.getUserById);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router