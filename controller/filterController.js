const DB = require('../models/index')

async function getColumns (req, res) {
  try {
    const allColumns=[]
    for(let property in DB.Country.schema.obj){
        allColumns.push({'name':property,'type':'dummy'})
      }
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({success: true, columns: allColumns}))
    res.end()
  } catch (e) {
    console.log(e)
  }
}
module.exports = { getColumns }
