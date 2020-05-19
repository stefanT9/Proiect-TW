const { Router } = require('../utils/Router')
const auth = require('./auth')
const filter = require('./filter')
const values = require('./values')
const inserts = require('./inserts')
const resources = require('./res')
const pages = require('./pages')
const user = require('./user')

var router = new Router()

// Page serving
router.use('', resources)
router.use('', pages)

/// Basic client functions
router.use('/filter', filter)
router.use('/auth', auth)

// Administrative
router.use('/user', user)
router.use('/values', values)
router.use('/insert', inserts)

module.exports.index = router
