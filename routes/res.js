const resController = require('../controller/resController')

const { Router } = require('../utils/Router')

const router = new Router()

router.get('/filters.css', resController.getFilterCSS)

module.exports = router