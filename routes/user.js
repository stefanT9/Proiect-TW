const userController = require('../controller/userController')
const {Router} = require('../utils/Router')

let router = new Router()

router.get('/',userController.getFunction)
router.post('/',userController.postFunction)
router.delete('/',userController.deleteFunction)
router.put('/',userController.putFunction)


module.exports = router