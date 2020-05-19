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

module.exports.insert = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  var value = req.body
  req.db.Columns.find({}, (err, columns) => {
    var newValue = {}
    for (var i = 0; i < columns.length; i++) {
      if (value.hasOwnProperty(columns[i].name)) {
        if (columns[i].type === 'discrete') {
          var key = value[columns[i].name]
          if (!isNaN(key)) {
            key = parseInt(key).toString()
          }
          if (columns[i].translate.get(key) !== null) {
            console.log(columns[i].translate.get(key))
            newValue[columns[i].name] = columns[i].translate.get(key)
          } else {
            console.log({ success: false, message: 'Descrete field ' + columns[i].name + " doesn't have a translation for " + key })
            res.statusCode = 400
            res.write(JSON.stringify({ success: false, message: 'Descrete field ' + columns[i].name + " doesn't have a translation for " + key }))
            res.end()
            newValue = null
            break
          }
        } else if (columns[i].type === 'continuous') {
          var num = value[columns[i].name]
          var update_made = false
          if ((columns[i].max === null) || (num > columns[i].max)) {
            columns[i].max = num
            update_made = true
          }
          if ((columns[i].min === null) || (num < columns[i].min)) {
            columns[i].min = num
            update_made = true
          }
          if (update_made) {
            columns[i].save((err) => {
              if (err) {
                console.log(err)
              }
            })
          }
          newValue[columns[i].name] = num
        }
      } else {
        res.statusCode = 400
        res.write(JSON.stringify({ success: false, message: 'Field ' + columns[i].name + ' not present' }))
        res.end()
        newValue = null
        break
      }
    }
    if (newValue !== null) {
      console.log(JSON.stringify(newValue))
      req.db.Values.create(newValue, (err, val) => {
        if (err) {
          res.statusCode = 500
          res.write(JSON.stringify({ success: false, message: 'Internal server error' }))
          res.end()
        } else {
          res.statusCode = 200
          res.write(JSON.stringify({ success: true, message: 'Object inserted' }))
          res.end()
        }
      })
    }
  })
}

module.exports.filterResults = async(req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try{
        var pagination = {}
        console.log((req.body.page !== undefined && req.body.size !== undefined))
        if(req.body.page !== undefined && req.body.size !== undefined){
            pagination["skip"] = req.body.page * req.body.size
            pagination["limit"] = req.body.size
        }
        console.log(pagination)
        req.db.Values.find(req.body.filters, req.body.columns.join(" ")+" -_id", pagination, (err, values)=>{
            if(err){
                res.statusCode = 500
                res.write(JSON.stringify({success:false, message:"Could not fetch data"}))
                res.end()
            }else{
                res.statusCode = 200
                res.write(JSON.stringify({success:true, message:"Found results", data:values}))
                res.end()
            }
        })
    }catch(err){
        console.log(err)
        res.statusCode = 500
        res.write(JSON.stringify({ success: false, message: 'Could not fetch data' }))
        res.end()
    }
}