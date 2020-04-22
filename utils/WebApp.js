const http = require('http')
const { port } = require('../utils/constants')
const { db_url } = require('../utils/constants')
const {MongoClient} = require('mongodb');
const client = new MongoClient(db_url, { useUnifiedTopology: true });

class WebApp {
  constructor (port, router) {
    this.port = port
    this.router = router
  }

  use () {

  }

  listen () {
    var app = this

    //e doar un proof of concept, fa conexiunea doar cand ai nevoie sa umblii la db
    try{
	client.connect();
    } catch (e) {
        console.error(e);
    }

    var server = http.createServer(function (req, res) {
      app.router.route(req, res)
      res.end()
    })
    server.listen(port)
    console.log(`app running on PORT: ${port}`)
  }
}

module.exports = { WebApp }
