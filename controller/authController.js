const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const DB = require('../models/index')
const constants = require('../utils/constants')


async function login(req, res) {
    res.setHeader('Content-Type', 'application/json')
    console.log('test')
    DB.User.findOne({ email: req.body.email }, (err, user) => {
        console.log({ "err": err, "user": user })
        if (err) {
            console.log(err)
            res.statusCode = 500
            res.write(JSON.stringify({ success: false, message: 'Internal server error' }))
            res.end()
        }
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.statusCode = 200
                const token = jwt.sign(req.body, constants.secret)
                res.write(JSON.stringify({ success: true, token: token }))
                res.end()
            }
            else {
                res.statusCode = 401
                res.write(JSON.stringify({ success: false, message: 'invalid email/password combination' }))
                res.end()
            }
        }
        else {
            res.statusCode = 401
            res.write(JSON.stringify({ success: false, message: 'invalid email' }))
            res.end()
        }
    })
}

async function register(req, res) {
    res.setHeader('Content-Type', 'application/json')
    const user = await DB.User.findOne({ email: req.body.email })
    console.log(user)
    if (user) {
        res.statusCode = 403
        res.write(JSON.stringify({ success: false, message: 'email is already being used' }))
        res.end()
    }
    else {

        user_ = new DB.User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,constants.rounds)
        })
        console.log(user_)
        user_.save((err) => {
            if (err) {
                console.log(err)
                res.statusCode = 500
                res.write(JSON.stringify({ success: false, message: 'Internal server error' }))
                res.end()
            }
            else {
                res.statusCode = 200
                res.write(JSON.stringify({ success: true, message: 'user created' }))
                res.end()
            }
        })
    }
}


module.exports = { login, register }
