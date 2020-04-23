const charts = require('chartjs')

async function getBarChartJSON (req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify({ success: true, chart: {} }))
  res.end()
}

async function getHorizontalBarChartJSON (req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify({ success: true, chart: {} }))
  res.end()
}

async function getScatterPlotChartJSON (req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify({ success: true, chart: {} }))
  res.end()
}

module.exports = { getBarChartJSON, getHorizontalBarChartJSON, getScatterPlotChartJSON }
