const express = require('express');
const userController = require('../controller/userController')

const router = express.Router();

router.post('/createUser', userController.createAppUser);
router.get('/getAllUser', userController.getAllAppUser);
router.get('/getUserDetail/:id', userController.getUserById);
router.delete('/deleteUser/:id', userController.deleteUserById);
router.put('/updateUser', userController.updateUser);
router.post('/login', userController.login);

module.exports = router;