const { isAuth,collectBody } = require('../middlewares/payloadValidation')

String.prototype.fullMatch = function (regex) {
  try{
    regex = new RegExp(regex)
  }
  catch (e)
  {
    return false
  }
  var matches = this.toString().match(regex)
  console.log('------------------')
  console.log(matches)
  console.log(this.toString())
  console.log(regex)

  for (var idx in matches)
  {
    if(matches[idx]===this.toString())
    {
      console.log(`match is ${matches[idx]}`)
      console.log(true)
      console.log('---------------')

      return true
    }
  }
  console.log(false)
  console.log('---------------')

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
            isAuth(req, res, this.getRoutes[val])
            // makes it so that you cant rewrite the response after the if
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
            // makes it so that you cant rewrite the response after the if  
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

