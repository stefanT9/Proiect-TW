const { Router } = require('../utils/Router')
const valueController = require('../controller/valueController')

var router = new Router()
router.get('', (req, res) => {
	res.writeHead(200, {})
	res.write('service is up')
	res.end()
})

router.get('/values/filter', valueController.filterResults)
router.post('/values', valueController.insert)

module.exports.valuesRouter = router
