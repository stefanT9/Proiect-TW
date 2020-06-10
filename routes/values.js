const valueController = require('../controller/valuesController')
const { Router } = require('../utils/Router')
const router = new Router()

router.get('/values', valueController.getAll)
router.post('/values/', valueController.postFunction)
router.post('/values', valueController.postFunction)
router.post('/values/insert', valueController.insert)
router.post('/values/find', valueController.filterResults)

router.get('/values/:id', valueController.getFunction)
router.put('/values/:id', valueController.putFunction)
router.delete('/values/:id', valueController.deleteFunction)

module.exports.valuesRouter = router