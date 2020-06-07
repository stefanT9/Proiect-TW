const http = require('http')
const { port } = require('../utils/constants')
//const { db_url } = require('../utils/constants')
const mongoose = require('mongoose')

class WebApp {
  constructor (port, router, db_url, name) {
    this.port = port
    this.router = router
    this.db_url = db_url
    this.name = name
  }

  use () {

  }

  async listen () {
    console.log(`${this.name} is started`)
    console.log(this.router)
    const app = this

    if(app.db_url !== undefined){
      await mongoose.connect(app.db_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
      console.log("connected to db")
    }
    const server = http.createServer(function (req, res) {
      app.router.route(req, res)
    })
    server.listen(app.port)
    console.log(`running on PORT: ${app.port}`)
  }
}

module.exports = { WebApp }
