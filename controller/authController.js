const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const constants = require('../utils/constants')

module.exports.login = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  console.log('test')
  req.db.User.findOne({ email: req.body.email }, (err, user) => {
    console.log({ err: err, user: user })
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
      } else {
        res.statusCode = 401
        res.write(JSON.stringify({ success: false, message: 'invalid email/password combination' }))
        res.end()
      }
    } else {
      res.statusCode = 401
      res.write(JSON.stringify({ success: false, message: 'invalid email' }))
      res.end()
    }
  })
}

module.exports.register = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const user = await req.db.User.findOne({ email: req.body.email })
  console.log(user)
  if (user) {
    res.statusCode = 403
    res.write(JSON.stringify({ success: false, message: 'email is already being used' }))
    res.end()
  } else {
    const user_ = new req.db.User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, constants.rounds)
    })
    console.log(user_)
    user_.save((err) => {
      if (err) {
        console.log(err)
        res.statusCode = 500
        res.write(JSON.stringify({ success: false, message: 'Internal server error' }))
        res.end()
      } else {
        res.statusCode = 200
        res.write(JSON.stringify({ success: true, message: 'user created' }))
        res.end()
      }
    })
  }
}
