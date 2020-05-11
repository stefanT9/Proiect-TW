const { Router } = require('../utils/Router')
const  charts  = require('./charts')
const  statistics  = require('./statistics')
const  auth  = require('./auth')
const  results  = require('./results')
const  filter  = require('./filter')
const  images  = require('./images')
const crud = require('./crud')

const indexController = require('../controller/index')

var router = new Router()
router.use('', statistics)
router.use('', results)
router.use('/crud',crud)
router.use('/filter', filter)
router.use('/image', images)
router.use('/charts', charts)
router.use('/auth',auth)

router.get('/', indexController.getIndexHTML)
router.get('/index', indexController.getIndexHTML)
router.get('/index.html', indexController.getIndexHTML)
router.get('/index.css', indexController.getIndexCSS)
router.get('/navbar.css', indexController.getNavbarCSS)
router.get('/index.js', indexController.getIndexJS)

module.exports.index = router
