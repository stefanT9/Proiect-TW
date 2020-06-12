const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const constants = require('../utils/constants')
const { xssFilter } = require('../utils/xssFilter')

module.exports.login = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  console.log('test')

  if (!req.body.email) {
    console.log('err')
    res.statusCode = 400
    res.write(JSON.stringify({ success: false, message: '"email" is required' }))
    res.end()
    return
  }
  if (!req.body.password) {
    console.log('err')
    res.statusCode = 400
    res.write(JSON.stringify({ success: false, message: '"password" is required' }))
    res.end()
    return
  }

  req.db.User.findOne({ email: String(req.body.email) }, (err, user) => {
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
  
  if (!req.body.email) {
    console.log('err')
    res.statusCode = 400
    res.write(JSON.stringify({ success: false, message: '"email" is required' }))
    res.end()
    return
  }
  if (!req.body.password) {
    console.log('err')
    res.statusCode = 400
    res.write(JSON.stringify({ success: false, message: '"password" is required' }))
    res.end()
    return
  }

  const user = await req.db.User.findOne({ email: xssFilter(String(req.body.email)) })
  if (user) {
    res.statusCode = 403
    res.write(JSON.stringify({ success: false, message: 'email is already being used' }))
    res.end()
  } else {
    const user_ = new req.db.User({
      email: xssFilter(String(req.body.email)),
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
