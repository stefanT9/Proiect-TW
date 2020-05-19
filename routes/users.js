const { Router } = require('../utils/Router')
const auth = require('./auth')
const user = require('./user')

var router = new Router()
router.get('', (req, res) => {
	res.writeHead(200, {})
	res.write('service is up')
	res.end()
})
router.use('/users', user)
router.use('/users/auth', auth)

module.exports.usersRouter = router