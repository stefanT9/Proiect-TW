const { Schema, model } = require('mongoose')

var countrySeriesSchema = new Schema({
  countryCode: String,
  seriesCode: String,
  description: String
})

module.exports = model('countrySeries', countrySeriesSchema, 'EdStatsCountrySeries')
