const fs = require('fs')

module.exports.getCSS = async(req, res) => {
    try{
        fs.readFile(req.url.substr(1), 'utf8', function(err, data) {
            if (err) {
                res.statusCode = 404
                res.setHeader('Content-Type', 'text/html')
                res.write(`not found at ${req.url}`)
                res.end()                    }
            else{
                try {
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'text/css')
                    res.write(data)
                    res.end()
            
                } catch (e) {
                    console.log(e)
                    res.statusCode = 500
                    res.setHeader('Content-Type', 'text/css')
                    res.write('Internal server error')
                    res.end()
                }
            }
        })
    }
    catch(e)
    {
        console.log(e)
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/css')
        res.write('Internal server error')
        res.end()
    }

}

module.exports.getHtml = async (req,res) =>{
    try{
        await fs.readFile(req.url.substr(1), 'utf8', function(err, data) {
            if (err) {
                res.statusCode = 404
                res.setHeader('Content-Type', 'text/html')
                res.write(`not found at ${req.url}`)
                res.end()            
            }
            else{
                try {
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'text/html')
                    res.write(data)
                    res.end()
            
                } catch (e) {
                    console.log(e)
                    res.statusCode = 500
                    res.setHeader('Content-Type', 'text/html')
                    res.write('Internal server error')
                    res.end()
                }
    
            }
        })
    }
    catch(e)
    {
        console.log(e)
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/html')
        res.write('Internal server error')
        res.end()
    }
}

module.exports.getJS = async (req,res) =>{
    try{
        await fs.readFile(req.url.substr(1), 'utf8', function(err, data) {
            if (err) {
                
                res.statusCode = 404
                res.setHeader('Content-Type', 'text/javascript')
                res.write(`not found at ${req.url}`)
                res.end()            
            }
            else{
                try {
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'text/javascript')
                    res.write(data)
                    res.end()
            
                } catch (e) {
                    console.log(e)
                    res.statusCode = 500
                    res.setHeader('Content-Type', 'text/javascript')
                    res.write('Internal server error')
                    res.end()
                }
    
            }
        })
    }
    catch(e)
    {
        console.log(e)
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/javascript')
        res.write('Internal server error')
        res.end()
    }
}