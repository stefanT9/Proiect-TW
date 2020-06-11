const { Router } = require('../utils/Router')
const resController = require('../controller/resController')

var router = new Router()

router.get('/', async(req, res) => {
    res.writeHead(302, { Location: '/index.html' })
    res.end()
})

router.get('/index', async(req, res) => {
    res.writeHead(302, { Location: '/index.html' })
    res.end()
})

router.get('/statistics', async(req, res) => {
    res.writeHead(302, { Location: '/statistics.html' })
    res.end()
})
router.get('/results', async(req, res) => {
    res.writeHead(302, { Location: '/results.html' })
    res.end()
})
router.get('/documentatie', async(req, res) => {
    res.writeHead(302, { Location: '/documentatie.html' })
    res.end()
})

router.get('/[0-9a-zA-Z]+.css', resController.getCSS)
router.get('/[0-9a-zA-Z]+.html', resController.getHtml)
router.get('/[0-9a-zA-Z]+.js', resController.getJS)
router.get('/[0-9a-zA-Z]+.jpg', resController.getPhoto)

module.exports.resourcesRouter = router