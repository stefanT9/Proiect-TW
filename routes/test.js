const { Router } = require('../utils/Router')
const { gettestHTML } = require('../controller/testController')

const router = new Router()

router.get('/test', gettestHTML)

module.exports = { test_path: router }
