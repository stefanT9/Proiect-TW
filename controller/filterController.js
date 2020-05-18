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