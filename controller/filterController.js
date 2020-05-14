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
    try {
        xField = req.body.xField
        yField = req.body.yField
        console.log(req.body.filter)
        var x = []
        var y = []

        await await DB.Country.find(req.body.filter, (err, row) => {
            if (err) {
                console.log(err)
            } else {
                console.log(row)
                x.push(row[xField])
                y.push(row[yField])
            }
        })
        res.write(JSON.stringify({ success: true, xData: x, yData: y, message: "Success!" }))
        res.end()
    } catch (e) {
        console.log(e)
        res.write(JSON.stringify({ success: false, message: "Internal server error!" }))
        res.end()
    }
}