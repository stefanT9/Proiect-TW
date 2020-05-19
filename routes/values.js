<<<<<<< HEAD
const valueController = require('../controller/valuesController')
const { Router } = require('../utils/Router')
const router = new Router()

router.get('', valueController.getAll)
router.get('/:id', valueController.getFunction)
router.post('/', valueController.postFunction)
router.put('/:id', valueController.putFunction)
router.delete('/:id', valueController.deleteFunction)

module.exports = router
>>>>>>> 6c078584b987fb846b7121840d52ce8a87033170
