const http = require('http')
const { port } = require('../utils/constants')
const { db_url } = require('../utils/constants')
const mongoose = require('mongoose')

class WebApp {
  constructor (port, router) {
    this.port = port
    this.router = router
  }

  use () {

  }

  async listen () {
    
    var app = this

    await mongoose.connect(db_url,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    var server = http.createServer(function (req, res) {
      app.router.route(req, res)
    })
    server.listen(port)
    console.log(`app running on PORT: ${port}`)
  }
}

module.exports = { WebApp }
