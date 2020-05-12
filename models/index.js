const Columns = require('./columns')
const Values = require('./values')
const User = require('./user')
const CountrySeries = require('./contrySeries')
const Country = require('./country')
const FootNote = require('./footNote')
const Series = require('./series')

db={
    User,
    Country,
    CountrySeries,
    FootNote,
    Series,
    Columns,
    Values
}
module.exports = db