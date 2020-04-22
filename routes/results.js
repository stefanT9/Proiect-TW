const { Router } = require('../utils/Router')
const { getResultsHTML, getResultsCSS  } = require('../controller/resultsController')

var router = new Router()

router.get('/results', getResultsHTML)
router.get('/results.html', getResultsHTML)
router.get('/results.css', getResultsCSS)

module.exports={results:router}