const crud = require('../controller/crudController')
const {Router} = require('../utils/Router')
const router = new Router()

router.get('/',crud.getFunction)
router.post('/',crud.postFunction)

module.exports=router