const net = require('net')
const constants = require('../utils/constants')

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

const server = net.createServer((sock) => {
	var node = undefined
	for(i in serverLoads){
		if(node === undefined){
			node = serverLoads[i]
		}else{
			if(node.currentLoad < serverLoads[i].currentLoad){
				node = serverLoads[i]
			}
		}
	}
	console.log([node.port, node.ip])
	if(node === undefined){
		return
	}
	node.currentLoad += 1
	node.connectionLog.push(sock.address())
	var transitSocket = new net.Socket()
	transitSocket.connect(node.port, node.ip, () => {
		transitSocket.pipe(sock)
		sock.pipe(transitSocket)
	})
	transitSocket.on('close', () => {
		node.currentLoad -= 1
	})
}).on('error', (err) => {
	console.log(err)
})

server.listen({
	port: listenData.port,
	host: listenData.ip
}, () => {
	console.log('opened load balancer', name, 'on', server.address());
})
