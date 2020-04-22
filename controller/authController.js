const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { User } = require('../models/user')

function login (req, res) {
    try{
        const user= User.find((err,users)=>{
            if(err) return console.error(err)
            console.log(users)
            return users[0]
        })
        
        if(!user)
        {      
            res.statusCode=401
            res.setHeader('Content-Type','application/json')
            res.write(JSON.stringify({success: false, message: 'invalid email'}))
            return
        }

        if(bcrypt.compareSync(req.body.password,user.password)){
            res.statusCode=200
            res.setHeader('Content-Type','application/json')
            const token = jwt.sign(req.body,secret)
            res.write(JSON.stringify({success: true, token: token})) 
        }
        else{
            res.statusCode=401
            res.setHeader('Content-Type','application/json')
            res.write(JSON.stringify({success: false, message: 'invalid email/password combination'}))
        }
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
        ///const user= await DB.getUserByEmail(req.body.email)
        const user={email:'asda@iahoo',password:'kanker'}
        if(user)
        {      
            res.statusCode=403
            res.setHeader('Content-Type','application/json')
            res.write(JSON.stringify({success: false, message: 'email is already being used'}))
            return
        }
        //await DB.addUser({email:req.body.email, password:req.body.password})
        res.statusCode=200
        res.setHeader('Content-Type','application/json')
        res.write(JSON.stringify({success: false, message: 'user created'}))
    }
    catch(e)
    {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'Internal server error' }))
    }
}


module.exports={login,register}
  