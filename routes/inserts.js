const { Router } = require('../utils/Router')
const valueController = require('../controller/valueController')
const columnController = require('../controller/columnsController')

var router = new Router()

router.post('/column',columnController.insert)
router.post('/value',valueController.insert)

module.exports = router
