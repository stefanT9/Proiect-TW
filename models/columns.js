const {Schema,model} = require('mongoose')

var columnSchema=new Schema({
    name:  String, 
    details: String,
    type: String,
    translate: Map,
    min: Number,
    max: Number
})

module.exports=model('Columns',columnSchema)
