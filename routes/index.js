const { Router } = require('../utils/Router')
const auth = require('./auth')
const values = require('./values')
const resources = require('./res')
const user = require('./user')

var router = new Router()

// Page serving
router.use('', resources)
router.use('', pages)

/// Basic client functions
router.use('/auth', auth)

// Administrative
router.use('/user', user)
router.use('/values', values)

module.exports.index = router
