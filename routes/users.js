const { Router } = require('../utils/Router')
const userController = require('../controller/userController')
const authController = require('../controller/authController')

var router = new Router()
router.get('/', async (req, res) => {
	res.writeHead(200, {})
	res.write('service is up')
	res.end()
})

router.get('/auth', async (req, res) => {
  res.writeHead(200, {})
  res.write('service is up')
  res.end()
})

router.get('/users/administrative/users', userController.getAll)
router.post('/users/administrative/users', userController.postFunction)
router.post('/auth/login', authController.login)
router.post('/auth/register', authController.register)


router.delete('/users/administrative/users/:id', userController.deleteFunction)
router.put('/users/administrative/users/:id', userController.putFunction)
router.get('/users/administrative/users/:id', userController.getFunction)


module.exports.usersRouter = router