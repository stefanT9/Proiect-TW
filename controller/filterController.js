module.exports.filterResults = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  try {
    var pagination = {}
    console.log((req.body.page !== undefined && req.body.size !== undefined))
    if (req.body.page !== undefined && req.body.size !== undefined) {
      pagination.skip = req.body.page * req.body.size
      pagination.limit = req.body.size
    }
    console.log(pagination)
    req.db.Values.find(req.body.filters, req.body.columns.join(' ') + ' -_id', pagination, (err, values) => {
      if (err) {
        res.statusCode = 500
        res.write(JSON.stringify({ success: false, message: 'Could not fetch data' }))
        res.end()
      } else {
        res.statusCode = 200
        res.write(JSON.stringify({ success: true, message: 'Found results', data: values }))
        res.end()
      }
    })
  } catch (err) {
    console.log(err)
    res.statusCode = 500
    res.write(JSON.stringify({ success: false, message: 'Could not fetch data' }))
    res.end()
  }
}
