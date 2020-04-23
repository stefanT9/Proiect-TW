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
        try {
          this.getRoutes[url](req,res)
        } catch (e) {
          console.log(e)
        }
      }
      else
      {

      }
    }
    if (req.method === 'POST') {
      if (this.postRoutes[url] !== undefined) {
        try {
          collectBody(req,res,this.postRoutes[url])
        } catch (e) {
          console.log(e)
        }
      }
      else
      {

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
      next(req,res)
    })
  }
  catch(e)
  {
    console.log(e)
  }
}

module.exports = { Router }

