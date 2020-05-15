const fs = require('fs')

const resPath = 'res/results'
const results = 'view/results'
let resultsHTML = ''
let resultsCSS = ''
const resultsJS = ''

fs.readFile(results + '.html', 'utf8', function (err, data) {
  if (err) {
    console.log(err)
    process.exit(1)
  }

  resultsHTML = data
})
fs.readFile(resPath + '.css', 'utf8', function (err, data) {
  if (err) {
    console.log(err)
    process.exit(1)
  }

  resultsCSS = data
})

module.exports.getResultsHTML = async (req, res) => {
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

module.exports.getResultsCSS = async (req, res) => {
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
