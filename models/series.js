const { Schema, model } = require('mongoose')

var seriesSchema = new Schema({
  email: String,
  password: String,
  seriesCode: String,
  topic: String,
  indicatorName: String,
  shortDefinition: String,
  longDefinition: String,
  unitOfMeasure: String,
  periodicity: String,
  basePeriod: String,
  otherNotes: String,
  aggregationMethond: String,
  limitationAndExceptions: String,
  notesFromOriginalSource: String,
  generalComments: String,
  source: String,
  statisticalConceptAndMethodology: String,
  developmentRelevance: String,
  relatedSourceLinks: String,
  otherWebLinks: String,
  relatedIndicators: String,
  licenceType: String
})

module.exports = model('series', seriesSchema, 'EdDataStatSeries')
