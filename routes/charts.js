const { Router } = require('../utils/Router')
const { getBarChartJSON, getHorizontalBarChartJSON, getScatterPlotChartJSON } = require('../controller/chartsController')

var router = new Router()

router.get('', (req, res) => {
  res.writeHead(200, {})
  res.write('service is up')
  res.end()
})
router.get('/bar', getBarChartJSON)
router.get('/horizontalBar', getHorizontalBarChartJSON)
router.get('/scatterPlot', getScatterPlotChartJSON)
module.exports.charts = router
