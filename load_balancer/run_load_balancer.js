const net = require('net')
const fs = require('fs')

try{
	var file = process.argv[2]
}catch(err){
	console.log("[!] You must provide a json file with the list of servers")
}

fs.readFile(file, (err, contents)=>{
	if(err){
		console.log("[!] Could not read file contents")
		return
	}
	try{
		var nodes = JSON.parse(contents)
	}catch(err){
		console.log("[!] Invalid json file")
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
		port: 1080,
		host: 'localhost'
	}, () => {
		console.log('opened server on', server.address());
	})

})