const { Router } = require('../utils/Router')
const filterController = require('../controller/filterController')

var router = new Router()

router.get('', (req, res) => {
  res.writeHead(200, {})
  res.write('service is up')
  res.end()
})
router.get('/all', filterController.getColumns)
router.post('/filter', filterController.filterResults)

module.exports = router
