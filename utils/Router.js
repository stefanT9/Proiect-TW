const { isAuth, collectBody } = require('../middlewares/payloadValidation')

String.prototype.fullMatch = function (regex) {
  try {
    regex = new RegExp(regex)
  } catch (e) {
    return false
  }
  var matches = this.toString().match(regex)
  for (var idx in matches) {
    if (matches[idx] === this.toString()) {
      return true
    }
  }

  return false
}

class Router {
  constructor () {
    this.getRoutes = {}
    this.postRoutes = {}
    this.putRoutes = {}
    this.deleteRoutes = {}
  }

  use (url, router) {
    let el
    for (el in router.getRoutes) {
      this.getRoutes[url + el] = router.getRoutes[el]
    }
    for (el in router.postRoutes) {
      this.postRoutes[url + el] = router.postRoutes[el]
    }
    for (el in router.putRoutes) {
      this.putRoutes[url + el] = router.putRoutes[el]
    }
    for (el in router.deleteRoutes) {
      this.deleteRoutes[url + el] = router.deleteRoutes[el]
    }
  }

  post (url, controller) {
    this.postRoutes[url] = controller
  }

  delete (url, controller) {
    this.deleteRoutes[url] = controller
  }

  put (url, controller) {
    this.putRoutes[url] = controller
  }

  get (url, controller) {
    this.getRoutes[url] = controller
  }

  route (req, res) {
    var url = req.url.split('?')[0]

    if (req.method === 'GET') {
      if (this.getRoutes[url] !== undefined) {
        isAuth(req, res, [this.getRoutes[url]])
      } else {
        for (var idx in Object.keys(this.getRoutes)) {
          const val = Object.keys(this.getRoutes)[idx]
          if (url.fullMatch(val)) {
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
        collectBody(req, res, [isAuth, this.postRoutes[url]])
      } else {
        Object.keys(this.postRoutes).forEach((val) => {
          if (url.fullMatch(val)) {
            collectBody(req, res, [isAuth, this.postRoutes[val]])
          }
        })

        res.statusCode = 404
        res.write(JSON.stringify({ success: false, message: 'not found' }))
        res.end()
      }
    }
    if (req.method === 'PUT') {
      if (this.postRoutes[url] !== undefined) {
        collectBody(req, res, [isAuth, this.putRoutes[url]])
      } else {
        Object.keys(this.putRoutes).forEach((val) => {
          if (url.fullMatch(val)) {
            collectBody(req, res, [isAuth, this.putRoutes[val]])
          }
        })

        res.statusCode = 404
        res.write(JSON.stringify({ success: false, message: 'not found' }))
        res.end()
      }
    }
    if (req.method === 'DELETE') {
      if (this.deleteRoutes[url] !== undefined) {
        collectBody(req, res, [isAuth, this.deleteRoutes[url]])
      } else {
        Object.keys(this.deleteRoutes).forEach((val) => {
          if (url.fullMatch(val)) {
            collectBody(req, res, [isAuth, this.deleteRoutes[val]])
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
