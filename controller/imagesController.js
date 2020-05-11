const fs = require('fs')

var image = ''

fs.readFile('res/images/background-home.jpg',(err, data)=>{
    image=data
    if(err)
    {
        console.log(err)
    }
})

module.exports.homeBackground = async (req,res) =>{
    try{
        response.writeHead(200,{'Content-Type':'image/jpg'});
        res.end(image, 'utf-8');    
    }
    catch(e)
    {
        console.log(e)
        response.writeHead(500)
        res.write()
        res.end()
    }
}