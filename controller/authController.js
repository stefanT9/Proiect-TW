//const bcrypt=require('bcrypt')
const {db} = require('../Data/index')

function login (req, res) {
    try{

        res.statusCode=200
        res.setHeader('Content-Type','application/json')
        res.write(JSON.stringify({success: true, token: token}))
    }
    catch(e)
    {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'Internal server error' }))
    }
}

function register (req, res) {
    try{

    }
    catch(e)
    {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'Internal server error' }))
    }
}


module.exports={login,register}
  