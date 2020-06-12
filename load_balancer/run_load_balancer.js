const constants = require('../utils/constants')
const forward = require('http-forward')
const http = require('http')

try{
	var name = process.argv[2]
}catch(err){
	console.log("[!] You must provide a load balancer name type")
}

try{
	var nodes = constants.load_balancers[name].nodes
	var listenData = constants.load_balancers[name].server
}catch(err){
	console.log("[!] Invalid config")
}

var serverLoads = []
for(i in nodes){
	serverLoads.push({
		ip: nodes[i].ip,
		port: nodes[i].port,
		currentLoad: 0,
		maxLoad: 0,
		connectionLog: []
	})
}

var idx = -1
const app = http.createServer((req, res) =>{
	idx = (idx+1) % serverLoads.length
	node = serverLoads[idx]
	req.forward = { target: `http://${node.ip}:${node.port}` }
	forward(req,res)
})
app.listen(listenData.port)