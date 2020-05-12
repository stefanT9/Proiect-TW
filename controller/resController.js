const fs = require('fs')

const resPath = 'res/filters'
const comPath = 'res/common'
let filterCSS = ''
let commonCSS = ''

fs.readFile(resPath + '.css', 'utf8', function(err, data) {
    if (err) {
        console.log(err)
        process.exit(1)
    }

    filterCSS = data
})

fs.readFile(comPath + '.css', 'utf8', function(err, data) {
    if (err) {
        console.log(err)
        process.exit(1)
    }

    commonCSS = data
})

module.exports.getFilterCSS = async(req, res) => {
    try {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/css')
        res.write(filterCSS)
        res.end()

    } catch (e) {
        console.log(e)
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/css')
        res.write('Internal server error')
        res.end()
    }
}

module.exports.getCommonCSS = async(req, res) => {
    try {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/css')
        res.write(commonCSS)
        res.end()

    } catch (e) {
        console.log(e)
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/css')
        res.write('Internal server error')
        res.end()
    }
}