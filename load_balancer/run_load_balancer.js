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

function chooseServer(){
	var node = undefined
	var index = undefined
	for(i in serverLoads){
		if(node === undefined){
			node = serverLoads[i]
			index = i
		}else{
			if(node.currentLoad < serverLoads[i].currentLoad){
				node = serverLoads[i]
				index = i
			}
		}
	}
	if(node === undefined){
		return
	}
	return {
		node: node,
		index: index
	}
}

const server = net.createServer((sock) => {
	server = chooseServer()
	node = server.node
	index = server.index
	not_connected = true
	while(not_connected){
		try{
			serverLoads[index].currentLoad += 1
			serverLoads[index].connectionLog.push(sock.address())
			var transitSocket = new net.Socket()
			transitSocket.connect(node.port, node.ip, () => {
				transitSocket.pipe(sock)
				sock.pipe(transitSocket)
			})
			transitSocket.on('close', () => {
				serverLoads[index].currentLoad -= 1
			})
			not_connected = false
		}catch(err){
			continue
		}
	}
}).on('error', (err) => {
	console.log(err)
})

server.listen({
	port: listenData.port,
	host: listenData.ip
}, () => {
	console.log('opened load balancer', name, 'on', server.address());
})
