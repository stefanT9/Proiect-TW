const { Router } = require('../utils/Router')
const { getColumns } = require('../controller/filterController')

var router = new Router()

router.get('', (req, res) => {
  res.writeHead(200, {})
  res.write('service is up')
  res.end()
})
router.get('/all',getColumns)

module.exports.filter = router
