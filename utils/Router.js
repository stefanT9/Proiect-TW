const { isAuth,collectBody } = require('../middlewares/payloadValidation')

String.prototype.fullMatch = function (regex) {
  try{
    regex = new RegExp(regex)
    console.log(`${regex}`)
  }
  catch (e)
  {
    return false
  }
  var matches = this.toString().match(regex)
  for (var idx in matches)
  {
    if(matches[idx]===this.toString())
    {
      console.log('------------------')
      console.log(regex.toString())
      console.log(matches[idx])
      console.log(this.toString())
      console.log('---------------')

      return true
    }
  }

  return false
}

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
    console.log(url)

    if (req.method === 'GET') {
      if (this.getRoutes[url] !== undefined) {
        isAuth(req,res,[this.getRoutes[url]])
      }
      else
      {
        for (var idx in Object.keys(this.getRoutes))
        {
          const val = Object.keys(this.getRoutes)[idx]
          if(url.fullMatch(val))
          {
            console.log(`${url} goes on ${val}`)
            isAuth(req, res, [this.getRoutes[val]])
            return
          }
        }
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
        Object.keys(this.postRoutes).forEach((val)=>{
          if(url.fullMatch(val))
          {
            collectBody(req,res,[isAuth,this.postRoutes[val]])
            return
          }          
        })

        res.statusCode = 404
        res.write(JSON.stringify({ success: false, message: 'not found' }))
        res.end()
      }
    }
  }
}

module.exports = { Router }

