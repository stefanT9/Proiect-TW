const DB = require('../models/index')

module.exports.insert = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  DB.Columns.findOne({ name: req.body.name }, (err, column) => {
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
        	DB.Columns.create(newColumn, (err, obj) => {
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
