const DB = require('../models/index')

module.exports.getColumns = async(req, res) => {
    res.setHeader('Content-Type', 'application/json')
    DB.Columns.find({}, (err, columns)=>{
        var results = []
        for(var i = 0; i<columns.length; i++){
            var columnFound = {name:columns[i]["name"], details:columns[i]["details"], type:columns[i]["type"]}
            if(columnFound["type"] == "discrete"){
                columnFound["values"] = []
                for(value of columns[i]["translate"]){
                    columnFound["values"].push(value[1])
                }
            }else{
                if(columns[i]["min"] === null || columns[i]["max"] === null){
                    continue
                }
                columnFound["min"] = columns[i]["min"]
                columnFound["max"] = columns[i]["max"]
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
        DB.Values.find(req.body.filters, req.body.columns.join(" ")+" -_id", (err, values)=>{
            if(err){
                res.statusCode = 500
                res.write({success:false, message:"Could not fetch data"})
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
        res.write(JSON.stringify({success:false, message:"Could not fetch data"}))
        res.end()
    }
}