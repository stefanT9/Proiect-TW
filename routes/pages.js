const { Router } = require('../utils/Router')
const { hostUrl } = require('../utils/constants')
const router = new Router()

router.get('/', async (req, res) => {
  res.writeHead(302, { Location: hostUrl + '/index.html' })
  res.end()
})

router.get('/index', async (req, res) => {
  res.writeHead(302, { Location: hostUrl + '/index.html' })
  res.end()
})

router.get('/statistics', async (req, res) => {
  res.writeHead(302, { Location: hostUrl + '/statistics.html' })
  res.end()
})
router.get('/results', async (req, res) => {
  res.writeHead(302, { Location: hostUrl + '/results.html' })
  res.end()
})

module.exports = router
