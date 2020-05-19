const { Router } = require('../utils/Router')
const resources = require('./res')
const pages = require('./pages')

var router = new Router()
router.use('', resources)
router.use('', pages)

module.exports.resourcesRouter = router