const { Router } = require('../utils/Router')
const auth = require('./auth')
const filter = require('./filter')
const crud = require('./crud')
const inserts = require('./inserts')
const resources = require('./res')
const pages = require('./pages')

var router = new Router()
router.use('', resources)
router.use('', pages)

router.use('/crud', crud)
router.use('/filter', filter)
router.use('/auth', auth)
router.use('/insert', inserts)

module.exports.index = router
