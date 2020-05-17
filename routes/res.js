const resController = require('../controller/resController')

const { Router } = require('../utils/Router')

const router = new Router()

router.get('/[0-9a-zA-Z]+.css', resController.getCSS)
router.get('/[0-9a-zA-Z]+.html', resController.getHtml)
router.get('/[0-9a-zA-Z]+.js', resController.getJS)
router.get('/[0-9a-zA-Z]+.jpg', resController.getPhoto)

module.exports = router
