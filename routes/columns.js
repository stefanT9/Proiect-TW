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

module.exports.columnsRouter = router