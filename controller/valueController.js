const DB = require('../models/index')

module.exports.insert = async(req, res) => {
	res.setHeader('Content-Type', 'application/json')
    var value = req.body
    DB.Columns.find({}, (err, columns)=>{
        var newValue = {}
        for (var i = 0; i < columns.length; i++) {
            if(value.hasOwnProperty(columns[i]["name"])){
                if(columns[i]["type"] === "discrete"){
                    var key = value[columns[i]["name"]]
                    if(!isNaN(key)){
                        key = parseInt(key).toString()
                    }
                    if(columns[i]["translate"].get(key) !== null){
                        console.log(columns[i]["translate"].get(key))
                        newValue[columns[i]["name"]] = columns[i]["translate"].get(key)
                    }else{
                        console.log({ success: false, message: 'Descrete field '+columns[i]["name"]+" doesn't have a translation for "+key})
                        res.statusCode = 400
                        res.write(JSON.stringify({ success: false, message: 'Descrete field '+columns[i]["name"]+" doesn't have a translation for "+key}))
                        res.end()
                        newValue = null
                        break
                    }
                }else if(columns[i]["type"] === "continuous"){
                    var num = value[columns[i]["name"]]
                    var update_made = false
                    if((columns[i]["max"] === null) || (num > columns[i]["max"])){
                        columns[i]["max"] = num
                        update_made = true
                    }
                    if((columns[i]["min"] === null) || (num < columns[i]["min"])){
                        columns[i]["min"] = num
                        update_made = true                        
                    }
                    if(update_made){
                        columns[i].save((err)=>{
                            if(err){
                                console.log(err)
                            }
                        })
                    }
                    newValue[columns[i]["name"]] = num
                }
            }else{
                res.statusCode = 400
                res.write(JSON.stringify({ success: false, message: 'Field '+columns[i]["name"]+" not present"}))
                res.end()
                newValue = null
                break
            }
        }
        if(newValue !== null){
            console.log(JSON.stringify(newValue))
            DB.Values.create(newValue, (err, val)=>{
                if(err){
                    res.statusCode = 500
                    res.write(JSON.stringify({ success: false, message: 'Internal server error' }))
                    res.end()
                }else{
                    res.statusCode = 200
                    res.write(JSON.stringify({ success: true, message: 'Object inserted' }))
                    res.end()
                }
            })
        }
    })   
}