const fs = require('fs')

const results = 'view/results'
let resultsHTML = ''
let resultsCSS = ''
let resultsJS = ''

fs.readFile(results + '.html', 'utf8', function (err, data) {
  if (err) {
    console.log(err)
    process.exit(1)
  }

  resultsHTML = data
})
fs.readFile(results + '.css', 'utf8', function (err, data) {
  if (err) {
    console.log(err)
    process.exit(1)
  }

  resultsCSS = data
})

function getResultsHTML (req, res) {
  try {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.write(resultsHTML)
    res.end()

  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.write('Internal server error')
    res.end()
  }
}
function getResultsCSS (req, res) {
  try {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/css')
    res.write(resultsCSS)
    res.end()

  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/css')
    res.write('Internal server error')
    res.end()

  }
}

module.exports = { getResultsHTML, getResultsCSS}
