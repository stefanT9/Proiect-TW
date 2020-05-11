const { isAuth } = require('../middlewares/payloadValidation')

class Router {
  constructor() {
    this.getRoutes = {}
    this.postRoutes = {}
  }

  use(url, router) {
    let el
    for (el in router.getRoutes) {
      this.getRoutes[url + el] = router.getRoutes[el]
    }
    for (el in router.postRoutes) {
      this.postRoutes[url + el] = router.postRoutes[el]
    }
  }

  post(url, controller) {
    this.postRoutes[url] = controller
  }

  get(url, controller) {
    this.getRoutes[url] = controller
  }

  route(req, res) {
    var url = req.url.split('?')[0]

    if (req.method === 'GET') {
      if (this.getRoutes[url] !== undefined) {
        isAuth(req,res,[this.getRoutes[url]])
      }
      else
      {
        res.statusCode = 404
        res.write(JSON.stringify({ success: false, message: 'not found' }))
        res.end()
      }
    }
    if (req.method === 'POST') {
      if (this.postRoutes[url] !== undefined) {
          collectBody(req,res,[isAuth, this.postRoutes[url]])
        }
      else
      {
        res.statusCode = 404
        res.write(JSON.stringify({ success: false, message: 'not found' }))
        res.end()
      }
    }
  }
}

function collectBody (req,res,next)
{
  try{
    var data = ''
    req.on('data', (chunk) => {
       data += chunk
    })
    req.on('end', () => {
      req.body=JSON.parse(data)
      next[0](req,res,next.slice(1))
    })
  }
  catch(e)
  {
    console.log(e)
  }
}

module.exports = { Router }

