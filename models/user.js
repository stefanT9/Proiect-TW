const mongo = require('mongoose')

var Schema = mongo.Schema;

var userSchema=new Schema({
    email:  String, 
    password: String
})

const userModel=mongo.model('User',userSchema)

module.exports={User:userModel}
