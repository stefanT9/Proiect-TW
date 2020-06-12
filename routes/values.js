const valueController = require('../controller/valuesController')
const { Router } = require('../utils/Router')
const router = new Router()

router.post('/values/find', valueController.filterResults)

router.get('/values/administrative/values', valueController.getAll)

router.get('/values/administrative/values/:id', valueController.getFunction)
router.post('/values/administrative/values', valueController.insert)
router.put('/values/administrative/values/:id', valueController.putFunction)
router.delete('/values/administrative/values/:id', valueController.deleteFunction)

module.exports.valuesRouter = router