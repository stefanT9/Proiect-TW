const valueController = require('../controller/valuesController')
const { Router } = require('../utils/Router')
const router = new Router()

router.post('/values/find', valueController.filterResults)

router.get('/administrative/values', valueController.getAll)
router.post('/administrative/values/insert', valueController.insert)

router.get('/administrative/values/:id', valueController.getFunction)
router.post('/administrative/values/', valueController.postFunction)
router.put('/administrative/values/:id', valueController.putFunction)
router.delete('/administrative/values/:id', valueController.deleteFunction)

module.exports.valuesRouter = router