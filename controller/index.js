const fs = require('fs')

const indexPath = 'view/index'
const navBarPath = 'view/navbar'
let indexHTML = ''
let indexCSS = ''
let indexJS = ''
let navBarCSS = ''

fs.readFile(indexPath + '.html', 'utf8', function (err, data) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  indexHTML = data
})
fs.readFile(indexPath + '.css', 'utf8', function (err, data) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  indexCSS = data
})

fs.readFile(navBarPath + '.css', 'utf8', function (err, data) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  navBarCSS = data
})

fs.readFile(indexPath + '.js', 'utf8', function (err, data) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  indexJS = data
})

function getIndexHTML (req, res) {
  try {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.write(indexHTML)
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.write('Internal server error')
  }
}
function getIndexCSS (req, res) {
  try {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/css')
    res.write(indexCSS)
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/css')
    res.write('Internal server error')
  }
}
function getNavbarCSS (req, res) {
  try {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/css')
    res.write(navBarCSS)
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/css')
    res.write('Internal server error')
  }
}
function getIndexJS (req, res) {
  try {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/javascript')
    res.write(indexJS)
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.write('Internal server error')
  }
}
module.exports = { getIndexHTML, getIndexCSS, getIndexJS, getNavbarCSS }
