const { Router } = require('../utils/Router')
const { getstatisticsHTML, getstatisticsCSS, getstatisticsJS } = require('../controller/statisticsController')

const router = new Router()

router.get('/statistics', getstatisticsHTML)
router.get('/statistics.html', getstatisticsHTML)
router.get('/statistics.css', getstatisticsCSS)
router.get('/statistics.js', getstatisticsJS)

module.exports = { statistics: router }
