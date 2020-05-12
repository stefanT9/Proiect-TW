const {Schema,model} = require('mongoose')

var footNoteSchema=new Schema({
    countryCode: String,
    seriesCode: String,
    year: String,
    desription: String
})

module.exports = model('footNote', footNoteSchema, 'EdStatFootnote')
