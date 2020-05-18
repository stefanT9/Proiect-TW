const userController = require('../controller/userController')
const { Router } = require('../utils/Router')

const router = new Router()

router.get('', userController.getAll)
router.get('/:id', userController.getFunction)
router.post('/', userController.postFunction)
router.delete('/:id', userController.deleteFunction)
router.put('/:id', userController.putFunction)

module.exports = router
