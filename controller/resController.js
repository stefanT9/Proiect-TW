const fs = require('fs')

<<<<<<< HEAD
const resPath = 'res/filters'
const comPath = 'res/common'
let filterCSS = ''
let commonCSS = ''

fs.readFile(resPath + '.css', 'utf8', function(err, data) {
    if (err) {
        console.log(err)
        process.exit(1)
=======
module.exports.getCSS = async(req, res) => {
    try{
        console.log("test functie css")
        var file
        await fs.readFile(req.url + '.css', 'utf8', function(err, data) {
            if (err) {
                console.log(err)
                process.exit(1)
            }
            file = data
        })
        try {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/css')
            res.write(file)
            res.end()
    
        } catch (e) {
            console.log(e)
            res.statusCode = 500
            res.setHeader('Content-Type', 'text/css')
            res.write('Internal server error')
            res.end()
        }
    }
    catch(e)
    {
        console.log(e)
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/css')
        res.write('Internal server error')
        res.end()
>>>>>>> e07e9a3a005b588a5edacc99698cba3ff458f356
    }

}

<<<<<<< HEAD
fs.readFile(comPath + '.css', 'utf8', function(err, data) {
    if (err) {
        console.log(err)
        process.exit(1)
    }

    commonCSS = data
})

module.exports.getFilterCSS = async(req, res) => {
=======
module.exports.getHtml = async (req,res) =>{
>>>>>>> e07e9a3a005b588a5edacc99698cba3ff458f356
    try {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.write(file)
        res.end()

    } catch (e) {
        console.log(e)
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/html')
        res.write('Internal server error')
        res.end()
    }
}

module.exports.getJS = async (req,res) =>{
    try {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/javascript')
        res.write(file)
        res.end()

    } catch (e) {
        console.log(e)
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/javascript')
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