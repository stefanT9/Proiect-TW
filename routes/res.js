const resController = require('../controller/resController')

const { Router } = require('../utils/Router')

const router = new Router()

router.get('/filters.css', resController.getFilterCSS)
router.get('/common.css', resController.getCommonCSS)

module.exports = router