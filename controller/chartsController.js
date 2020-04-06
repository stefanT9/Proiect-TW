
function getBarChartJSON (req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify({ success: true, chart: {} }))
}

function getHorizontalBarChartJSON (req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify({ success: true, chart: {} }))
}

function getScatterPlotChartJSON (req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify({ success: true, chart: {} }))
}

module.exports = { getBarChartJSON, getHorizontalBarChartJSON, getScatterPlotChartJSON }
