const fs = require('fs')

const indexPath = 'view/index'
const navBarPath = 'res/navbar'
const resPath = 'res/index'
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
fs.readFile(resPath + '.css', 'utf8', function (err, data) {
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

fs.readFile(resPath + '.js', 'utf8', function (err, data) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  indexJS = data
})

async function getIndexHTML (req, res) {
  try {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.write(indexHTML)
    res.end()
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.write('Internal server error')
    res.end()
  }
}
async function getIndexCSS (req, res) {
  try {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/css')
    res.write(indexCSS)
    res.end()

  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/css')
    res.write('Internal server error')
    res.end()
  }
}
async function getNavbarCSS (req, res) {
  try {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/css')
    res.write(navBarCSS)
    res.end()

  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/css')
    res.write('Internal server error')
    res.end()
  }
}
async function getIndexJS (req, res) {
  try {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/javascript')
    res.write(indexJS)
    res.end()

  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.write('Internal server error')
    res.end()
  }
}

module.exports = { getIndexHTML, getIndexCSS, getIndexJS, getNavbarCSS }
