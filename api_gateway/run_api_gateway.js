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
		var services = JSON.parse(contents)
	}catch(err){
		console.log("[!] Invalid json file")
	}

	console.log(services)
	const server = net.createServer((sock) => {
		console.log("[*] New connection "+sock.address())
		var node = undefined
		sock.on('end', ()=>{
			if(node !== undefined){
				node.end()
			}
		})
		sock.on('data', (data)=>{
			var dataAsString = data.toString()
			if(node === undefined){
				var firstRow = dataAsString.split(/\r?\n/)[0]
				if(firstRow.split(' ')[1].includes('/users')){
					node = new net.Socket()
					node.connect(services['users'].port, services['users'].ip, ()=>{
						node.write(data)
						node.on('data', (data)=>{
							sock.write(data)
						})
						node.on('end', ()=>{
							sock.end()
						})
					})
				}else if(firstRow.split(' ')[1].includes('/columns')){
					node = new net.Socket()
					node.connect(services['columns'].port, services['columns'].ip, ()=>{
						node.write(data)
						node.on('data', (data)=>{
							sock.write(data)
						})
						node.on('end', ()=>{
							sock.end()
						})
					})
				}else if(firstRow.split(' ')[1].includes('/values')){
					node = new net.Socket()
					node.connect(services['values'].port, services['values'].ip, ()=>{
						node.write(data)
						node.on('data', (data)=>{
							sock.write(data)
						})
						node.on('end', ()=>{
							sock.end()
						})
					})
				}else{
					node = new net.Socket()
					node.connect(services['resources'].port, services['resources'].ip, ()=>{
						node.write(data)
						node.on('data', (data)=>{
							sock.write(data)
						})
						node.on('end', ()=>{
							sock.end()
						})
					})
				}
			}else{
				node.write(data)
			}
		})
	}).on('error', (err) => {
		console.log(err)
	})

	server.listen({
		port: 80,
		host: 'localhost'
	}, () => {
		console.log('opened server on', server.address());
	})

})