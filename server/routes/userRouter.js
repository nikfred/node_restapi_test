const Router = require('express')
const router = Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/all', authMiddleware, userController.getAll)
router.get('/:id', authMiddleware, userController.get)
router.put('/', authMiddleware, userController.updatePassword)
router.delete('/', authMiddleware, userController.delete)


module.exports = router