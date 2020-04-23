const mongo = require('mongoose')

var Schema = mongo.Schema;

var userSchema=new Schema({
    email:  String, 
    password: String
})

module.exports=mongo.model('User',userSchema)
