var { ObjectId } = require('mongodb')

module.exports.getAll = async (req, res) => {
  try {
    const users = await req.db.User.find()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ success: true, users, message: 'Succes!' }))
    res.end()
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ success: false, message: 'Internal server error!' }))
    res.end()
  }
}
module.exports.getFunction = async (req, res) => {
  try {
    const user = await req.db.User.findOne({ _id: ObjectId(req.pathParams.id) })
    if (user === null) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify({ success: false, message: 'User not found' }))
      res.end()
    } else {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify({ success: true, user, message: 'Succes!' }))
      res.end()
    }
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ success: false, message: 'Internal server error!' }))
    res.end()
  }
}

module.exports.postFunction = async (req, res) => {
  try {
    const user = new req.db.User(req.body.element)

    user.save((err) => {
      if (err) {
        console.log(err)
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'Internal server error' }))
        res.end()
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: true, user, message: 'user inserted' }))
        res.end()
      }
    })
  } catch (e) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ success: false, message: 'Internal server error!' }))
    res.end()
  }
}

module.exports.deleteFunction = async (req, res) => {
  try {
    const user = await req.db.User.findOne({ _id: ObjectId(req.pathParams.id) })
    if (user === null) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify({ success: false, message: 'User not found' }))
      res.end()
      return
    }
    req.db.User.remove({ _id: ObjectId(req.pathParams.id) }, (err) => {
      if (err) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'Internal server error!' }))
        res.end()
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: true, message: 'Succes!' }))
        res.end()
      }
    })
  } catch (e) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ success: false, message: 'Internal server error!' }))
    res.end()
  }
}

module.exports.putFunction = async (req, res) => {
  try {
    const user = await req.db.User.findOne({ _id: ObjectId(req.pathParams.id) })
    const updatedUser = new req.db.User(req.body.element)
    updatedUser._id = document._id
    updatedUser.save((err) => {
      if (err) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'Internal server error!' }))
        res.end()
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: true, user, message: 'Succes!' }))
        res.end()
      }
    })
  } catch (e) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ success: false, message: 'Internal server error!' }))
    res.end()
  }
}
