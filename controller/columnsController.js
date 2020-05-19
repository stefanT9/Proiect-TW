module.exports.internalSetMinColumns = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  req.db.Columns.find({name:req.body.name}, (err, columns) => {
    if(err){
      res.statusCode = 500
      res.write(JSON.stringify({ success: false, message: 'Internal server error' }))
      res.end()  
    }else{
      columns[0].min = req.body.min
      columns[0].save((err) => {
        if (err) {
          res.statusCode = 500
          res.write(JSON.stringify({ success: false, message: 'Internal server error' }))
          res.end()
        }else{
          res.statusCode = 200
          res.write(JSON.stringify({ success: true, columns: columns }))
          res.end()
        }
      })
    }
  })
}

module.exports.internalSetMaxColumns = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  req.db.Columns.find({name:req.body.name}, (err, columns) => {
    if(err){
      res.statusCode = 500
      res.write(JSON.stringify({ success: false, message: 'Internal server error' }))
      res.end()  
    }else{
      columns[0].max = req.body.max
      columns[0].save((err) => {
        if (err) {
          res.statusCode = 500
          res.write(JSON.stringify({ success: false, message: 'Internal server error' }))
          res.end()
        }else{
          res.statusCode = 200
          res.write(JSON.stringify({ success: true, columns: columns }))
          res.end()
        }
      })
    }
  })
}

module.exports.internalGetColumns = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  req.db.Columns.find({}, (err, columns) => {
    if(err){
      res.statusCode = 500
      res.write(JSON.stringify({ success: false, message: 'Internal server error' }))
      res.end()  
    }else{
      res.statusCode = 200
      res.write(JSON.stringify({ success: true, columns: columns }))
      res.end()
    }
  })
}

module.exports.insert = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  req.db.Columns.findOne({ name: req.body.name }, (err, column) => {
    if (err) {
      console.log('on find ' + err)
      res.statusCode = 500
      res.write(JSON.stringify({ success: false, message: 'Internal server error' }))
      res.end()
    }
    if (column) {
      res.statusCode = 409
      res.write(JSON.stringify({ success: false, message: 'Column already exists' }))
      res.end()
    } else {
      var newColumn = {
        name: req.body.name,
        details: req.body.details,
        type: req.body.type
      }
      if (req.body.type === 'continuous') {
        newColumn.min = null
        newColumn.max = null
      } else if (req.body.type === 'discrete') {
        newColumn.translate = req.body.translate
      }
      req.db.Columns.create(newColumn, (err, obj) => {
        if (err) {
          console.log('on create ' + err)
          res.statusCode = 500
          res.write(JSON.stringify({ success: false, message: 'Internal server error' }))
          res.end()
        } else {
          res.statusCode = 200
          res.write(JSON.stringify({ success: true, message: 'Column inserted' }))
          res.end()
        }
      })
    }
  })
}


module.exports.getColumns = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  req.db.Columns.find({}, (err, columns) => {
    var results = []
    for (var i = 0; i < columns.length; i++) {
      var columnFound = { name: columns[i].name, details: columns[i].details, type: columns[i].type }
      if (columnFound.type == 'discrete') {
        columnFound.values = []
        for (value of columns[i].translate) {
          columnFound.values.push(value[1])
        }
      } else {
        if (columns[i].min === null || columns[i].max === null) {
          continue
        }
        columnFound.min = columns[i].min
        columnFound.max = columns[i].max
      }
      results.push(columnFound)
    }
    res.statusCode = 200
    res.write(JSON.stringify({ success: true, columns: results }))
    res.end()
  })
}