const mongo = require('mongoose')

var Schema = mongoose.Schema;

var countrySeriesSchema=new Schema({
    countryCode: String,
    seriesCode: String,
    description: String
})

module.exports={countrySeriesSchema}