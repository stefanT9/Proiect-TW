const bcrypt = require('bcrypt')
const { secret } = require('../utils/constants')
const jwt = require('jsonwebtoken')

module.exports.isAuth = (req,res,next) =>{
    console.log(req._header)
    try{
        const url = req.url.split('?')[0]
        const token = req.headers.token

        if(url.includes('/crud'))
        {
            try{
                var obj = jwt.verify(token,secret)
                next[0](req,res,next.slice(1))   
            }
            catch(e){
                res.writeHead(403,'aplication/json')
                res.write(JSON.stringify({result:false,message:'Auth is required'}))
                res.end()
            }
        }
        else{
            next[0](req,res,next,next.slice(1))
        }
    } catch(e) {
        console.log(e)
        res.writeHead(500,'aplication/json')
        res.write(JSON.stringify({result:false,message:'internal server error'}))
        res.end()
    }
}


module.exports.collectBody = (req,res,next) => {
  try{
    var data = ''
    req.on('data', (chunk) => {
       data += chunk
    })
    req.on('end', () => {
      req.body=JSON.parse(data)
      next[0](req,res,next.slice(1))
    })
  }
  catch(e)
  {
    console.log(e)
  }
}