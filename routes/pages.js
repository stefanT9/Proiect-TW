const { Router } = require('../utils/Router')
const { hostUrl } = require('../utils/constants')
const router = new Router()

router.get('/', async (req, res) =>{
    res.writeHead(302, {'Location': hostUrl + '/public/index.html'});
    res.end();
})

router.get('/index', async (req, res) =>{
    res.writeHead(302, {'Location': hostUrl + '/public/index.html'});
    res.end();
})

router.get('/index.html', async (req, res) =>{
    res.writeHead(302, {'Location': hostUrl + '/public/index.html'});
    res.end();
})

router.get('/statistics', async (req, res) => {
    res.writeHead(302, {'Location': hostUrl + '/public/index.html'});
    res.end();
})

router.get('/statistics.html', async (req, res) => {
    res.writeHead(302, {'Location': hostUrl + '/public/index.html'});
    res.end();
})

router.get('/results', async (req, res) =>{
    res.writeHead(302, {'Location': hostUrl + '/public/index.html'});
    res.end();
})

router.get('/results.html', async (req, res) =>{
    res.writeHead(302, {'Location': hostUrl + '/public/index.html'});
    res.end();
})

module.exports = router