const express = require('express')
const router = express.Router()
const { getAllUsers, registerUser, loginUser, logoutUser, handleRefreshToken } = require('../controllers/usersController')

router.get('/', getAllUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/refresh', handleRefreshToken)

module.exports = router