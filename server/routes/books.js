const express = require('express')
const router = express.Router()
const { getAllBooks, addBook, updateBook, removeBook, getBook, getIssuedBooks, getAvailableBooks } = require('../controllers/booksController')
const roles = require('../config/roles_list')
const verifyRoles = require('../middleware/verifyRoles')

// Verify JWT Middleware : Verifies JWT
// VerifyRoles: Checks for Authorization

router.get('/', getAllBooks)
router.get('/issued', getIssuedBooks)
router.get('/available', getAvailableBooks)
router.get('/id/:id', getBook)
router.use(require('../middleware/verifyJWT'))
router.route('/add').post(verifyRoles(roles.Editor, roles.Admin), addBook)
router.route('/update/:id').put(verifyRoles(roles.Editor, roles.Admin), updateBook)
router.route('/remove/:id').delete(verifyRoles(roles.Editor, roles.Admin), removeBook)

module.exports = router