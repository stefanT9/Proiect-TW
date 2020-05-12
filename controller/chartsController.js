const charts = require('chartjs')

module.exports.getBarChartJSON = async (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify({ success: true, chart: {} }))
  res.end()
}

module.exports.getHorizontalBarChartJSON = async (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify({ success: true, chart: {} }))
  res.end()
}

module.exports.getScatterPlotChartJSON = async (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify({ success: true, chart: {} }))
  res.end()
}