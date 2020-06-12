const valueController = require('../controller/valuesController')
const { Router } = require('../utils/Router')
const router = new Router()

router.post('/values/find', valueController.filterResults)

router.get('/values/administrative/values', valueController.getAll)
router.post('/values/administrative/values/insert', valueController.insert)

router.get('/values/administrative/values/:id', valueController.getFunction)
router.post('/values/administrative/values', valueController.postFunction)
router.put('/values/administrative/values/:id', valueController.putFunction)
router.delete('/values/administrative/values/:id', valueController.deleteFunction)

module.exports.valuesRouter = router