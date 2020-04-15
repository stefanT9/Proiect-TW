const mongo = require('mongoose')

var Schema = mongoose.Schema;

var userSchema=new Schema({
    email:  String, // String is shorthand for {type: String}
    password: String
})

module.exports={userSchema}
