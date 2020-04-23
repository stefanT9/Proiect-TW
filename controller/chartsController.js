
function getBarChartJSON (req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify({ success: true, chart: {} }))
  res.end()
}

function getHorizontalBarChartJSON (req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify({ success: true, chart: {} }))
  res.end()
}

function getScatterPlotChartJSON (req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify({ success: true, chart: {} }))
  res.end()
}

module.exports = { getBarChartJSON, getHorizontalBarChartJSON, getScatterPlotChartJSON }
