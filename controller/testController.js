const fs = require('fs')
const Mustache = require('mustache')

const path = 'view/moustache_test'
let main_template = ''
let include = ''

fs.readFile('view/mustache_test.html', 'utf8', function (err, data) {
  if (err) {
    console.log(err)
    process.exit(1)
  }

  main_template = data
})

fs.readFile('view/minclude.html', 'utf8', function (err, data) {
  if (err) {
    console.log(err)
    process.exit(1)
  }

  include = data
})

function gettestHTML (req, res) {
  console.log('aaaaaa')
  try {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.write(Mustache.render(main_template, { minclude: include }))
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.write('Internal server error')
  }
}
module.exports = { gettestHTML }
