const mongo = require('mongoose')

var Schema = mongoose.Schema;

var footNoteSchema=new Schema({
    countryCode: String,
    seriesCode: String,
    year: String,
    desription: String
})

module.exports=mongo.model('footNote',footNoteSchema)
