
module.exports.getFunction = async(req,res) =>{
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ success: true,url: req.url, message: "isAuth middleware works" }))
    res.end()
}

module.exports.postFunction = async(req,res) =>{
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ success: true, message: "isAuth middleware works" }))
    res.end()
}