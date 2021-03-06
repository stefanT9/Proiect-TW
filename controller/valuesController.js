var { ObjectId } = require('mongodb')

module.exports.getAll = async (req, res) => {
  try {
    const users = await req.db.Values.find()
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
    const document = await req.db.Values.findOne({ _id: ObjectId(req.params.id) })

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ success: true, foundDocument: document, message: 'Succes!' }))
    res.end()
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
    const value = new req.db.Values(req.body.element)

    value.save((err) => {
      if (err) {
        console.log(err)
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'Internal server error' }))
        res.end()
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: true, value: value, message: 'value inserted' }))
        res.end()
      }
    })
  } catch (e) {
    console.log(value)
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
    req.db.Values.remove({ _id: ObjectId(req.pathParams.id) }, (err) => {
      if (err) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'Internal server error!' }))
        res.end()
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: true, user: req.user, message: 'Succes!' }))
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
    const document = await req.db.Values.findOne({ _id: ObjectId(req.pathParams.id) })
    const updatedDocument = new req.db.Values(req.body.element)
    updatedDocument._id = document._id
    updatedDocument.save((err) => {
      if (err) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'Internal server error!' }))
        res.end()
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: true, user: updatedDocument, message: 'Succes!' }))
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
