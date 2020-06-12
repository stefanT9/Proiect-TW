const { secret,internalToken } = require('../utils/constants')
const jwt = require('jsonwebtoken')
const url = require('url')
const DB = require('../models/index')

module.exports.internalAuth = (req,res,next) => {
  console.log('internalAuth')
  try{
    if(req.url.includes('/internal'))
    {
      if(req.headers.authorization && req.headers.authorization.split('Bearer ')[1] === internalToken )
      {
        next[0](req, res, next.slice(1))
      }
      else{
        res.writeHead(403, 'aplication/json')
        res.write(JSON.stringify({ result: false, message: 'Only internal calls are allowed' }))
        res.end()
      }
    }
    else{
      next[0](req, res, next.slice(1))
    }
  }
  catch (e) {
    console.log(e)
    res.writeHead(500, 'aplication/json')
    res.write(JSON.stringify({ result: false, message: 'internal server error' }))
    res.end()
  }
}

module.exports.isAuth = (req, res, next) => {
  console.log('isAuth')

  try {
    const url = req.url.split('?')[0]
    if(req.url.includes('/administrative')) {
      try {
        console.log(req.url)
        const token = req.headers.authorization.split('Bearer ')[1]
        var obj = jwt.verify(token, secret)

        delete obj.password
        req.user = obj
        next[0](req, res, next.slice(1))
      } catch (e) {
        console.log(e)
        res.writeHead(403, 'aplication/json')
        res.write(JSON.stringify({ result: false, message: 'Auth is required' }))
        res.end()
      }
    } else {
      next[0](req, res, next.slice(1))
    }
  } catch (e) {
    console.log(e)
    res.writeHead(500, 'aplication/json')
    res.write(JSON.stringify({ result: false, message: 'internal server error' }))
    res.end()
  }
}

module.exports.collectBody = (req, res, next) => {
  console.log('collect body')

  try {
    var bodyData = ''
    req.on('data', (bodyChunk) => {
      try {
        bodyData += bodyChunk
      } catch (e) {
        console.log(e)
        res.writeHead(500, 'aplication/json')
        res.write(JSON.stringify({ result: false, message: 'internal server error' }))
        res.end()
      }
    })
    req.on('end', () => {
      try {
        req.body = JSON.parse(bodyData)
        next[0](req, res, next.slice(1))
        
      } catch (e) {
        res.writeHead(400, 'aplication/json')
        res.write(JSON.stringify({ result: false, message: 'Bad request' }))
        res.end()
      }
    })
  } catch (e) {
    console.log(e)
    res.writeHead(500, 'aplication/json')
    res.write(JSON.stringify({ result: false, message: 'internal server error' }))
    res.end()
  }
}
module.exports.composeDatabase = (req, res, next) => {
  console.log('composing database')

  try {
    req.db = DB
    next[0](req, res, next.splice(1))
  } catch (e) {
    console.log(e)
    res.writeHead(500, 'aplication/json')
    res.write(JSON.stringify({ result: false, message: 'internal server error' }))
    res.end()
  }
}
module.exports.collectParameters = (req, res, next) => {
  console.log('collecting parameters')
  try {
    req.params = url.parse(req.url, true).query
    next[0](req, res, next.slice(1))
  } catch (e) {
    console.log(e)
    res.writeHead(500, 'aplication/json')
    res.write(JSON.stringify({ result: false, message: 'internal server error' }))
    res.end()
  }
  console.log('collected parameters')
  console.log(next[0])

}

module.exports.checkBody = (req, res, next, args) => {
  console.log('checking body')
  try {
    const payload = req.body
    const schemaToCheck = args[0]

    for (const key of Object.keys(schemaToCheck)) {
      if (payload.hasOwnProperty(key)) {
        if (typeof (payload[key]) !== schemaToCheck[key]) {
          return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: 'Bad request'
          })
        }
      }
    }

    for (const key of Object.keys(payload)) {
      if (!schemaToCheck.hasOwnProperty(key)) {
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Bad request'
        })
      }
    }

    next[0](req, res, next.slice(1), args.slice(1))
  } catch (e) {
    console.log(e)
    res.writeHead(500, 'aplication/json')
    res.write(JSON.stringify({ result: false, message: 'internal server error' }))
    res.end()
  }
}
