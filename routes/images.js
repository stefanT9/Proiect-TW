const imagesController = require ("../controller/imagesController")
const { Router } = require('../utils/Router')

const router = new Router()

router.get('/background-home.jpg',imagesController.homeBackground)

module.exports = router