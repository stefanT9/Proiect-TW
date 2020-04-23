const fs = require('fs')

const statistics = 'view/statistics'
let statisticsHTML = ''
let statisticsCSS = ''
let statisticsJS = ''

fs.readFile(statistics + '.html', 'utf8', function (err, data) {
  if (err) {
    console.log(err)
    process.exit(1)
  }

  statisticsHTML = data
})
fs.readFile(statistics + '.css', 'utf8', function (err, data) {
  if (err) {
    console.log(err)
    process.exit(1)
  }

  statisticsCSS = data
})
fs.readFile(statistics + '.js', 'utf8', function (err, data) {
  if (err) {
    console.log(err)
    process.exit(1)
  }

  statisticsJS = data
})

function getstatisticsHTML (req, res) {
  try {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.write(statisticsHTML)
    res.end()

  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.write('Internal server error')
    res.end()

  }
}
function getstatisticsCSS (req, res) {
  try {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/css')
    res.write(statisticsCSS)
    res.end()

  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/css')
    res.write('Internal server error')
    res.end()

  }
}
function getstatisticsJS (req, res) {
  try {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/javascript')
    res.write(statisticsJS)
    res.end()

  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.write('Internal server error')
    res.end()

  }
}
module.exports = { getstatisticsHTML, getstatisticsCSS, getstatisticsJS }
