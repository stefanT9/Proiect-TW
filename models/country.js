const mongo = require('mongoose')

var Schema = mongoose.Schema;

var countrySchema=new Schema({
    countryCode: String,
    shortName: String,
    tableName: String,
    longName: String,
    alphaCode: String,
    currency: String,
    specialNotes: String,
    region: String,
    incomeGroup: String,
    wbCode: String,
    nationalAccountsBaseYear: String,
    nationalAccountsReferenceYear: String,
    snaPriceValuation: String,
    lendingCategory: String,
    otherGroups: String,
    systemOfNationalAccount:String,
    alternativeConversationFactor:String,
    p3SurveyYear:String,
    balanceOfPaymentsManualInUse:String,
    externalDebtConversationFactor:String,
    systemOfTrade:String,
    governmentAccountingConcept:String,
    imfDataDisseminationStandard:String,
    latestPopulationCensus:String,
    latestHouseHoldSurvey:String,
    sourceOfMostRecentIncome:String,
    vitalRegistrationComplete:String,
    latestAgriculturalCensus:String,
    latestIndustrialData:String,
    latestTradeData:String,
    latestWaterWithdrawalData:String,
})

module.exports=mongo.model('country',countrySchema)
