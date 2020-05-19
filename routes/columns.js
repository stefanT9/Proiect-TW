const { Router } = require('../utils/Router')
const columnsController = require('../controller/columnsController')

var router = new Router()

router.get('/', async (req, res) => {
	res.writeHead(200, {})
	res.write('service is up')
	res.end()
})

router.get('/columns', columnsController.getColumns)
router.post('/columns', columnsController.insert)
router.get('/columns/internalget', columnsController.internalGetColumns)
router.post('/columns/internalupdatemin', columnsController.internalSetMinColumns)
router.post('/columns/internalupdatemax', columnsController.internalSetMaxColumns)

module.exports.columnsRouter = router