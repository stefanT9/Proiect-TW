const DB = require('../models/index')

module.exports.getColumns = async(req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
        const allColumns = []
        for (let property in DB.Country.schema.obj) {
            allColumns.push({ 'name': property, 'type': 'dummy' })
        }
        res.write(JSON.stringify({ success: true, columns: allColumns }))
        res.end()
    } catch (e) {
        console.log(e)
        res.write(JSON.stringify({ success: false, message: "Internal server error" }))
        res.end()
    }
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