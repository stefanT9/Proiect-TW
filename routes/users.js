const { Router } = require('../utils/Router')
const userController = require('../controller/userController')
const authController = require('../controller/authController')

var router = new Router()
router.get('/', async (req, res) => {
	res.writeHead(200, {})
	res.write('service is up')
	res.end()
})

router.get('/users', userController.getAll)
router.get('/users/:id', userController.getFunction)
router.post('/users/', userController.postFunction)
router.delete('/users/:id', userController.deleteFunction)
router.put('/users/:id', userController.putFunction)

router.get('/auth', async (req, res) => {
  res.writeHead(200, {})
  res.write('service is up')
  res.end()
})
router.post('/auth/login', authController.login)
router.post('/auth/register', authController.register)

module.exports.usersRouter = router