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
		sock.on('error', (err)=>{
			console.log('client err')
			console.log(err)
		})
		sock.on('end', ()=>{
			if(node !== undefined){
				node.end()
				node = undefined
			}
		})
		sock.on('data', (data)=>{
			var dataAsString = data.toString()
			var firstRow = dataAsString.split(/\r?\n/)[0].split(' ')
			console.log(firstRow[0])
			if(firstRow[0] in ["GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH"]){
				if(node !== undefined){
					node.end()
				}
				//var firstRow = dataAsString.split(/\r?\n/)[0]
				if(firstRow[1].includes('/users')){
					console.log("[*] new request to "+firstRow.split(' ')[1]+" redirecting to users on "+services['users'].port+" "+services['users'].ip)
					node = new net.Socket()
					node.on('error', (err)=>{
						console.log("node err")
						console.log(err)
					})
					node.connect(services['users'].port, services['users'].ip, ()=>{
						node.write(data)
						node.on('data', (data)=>{
							sock.write(data)
							//sock.end()
						})
						node.on('end', ()=>{
							sock.end()
						})
					})
				}else if(firstRow[1].includes('/columns')){
					node = new net.Socket()
					node.on('error', (err)=>{
						console.log("node err")
						console.log(err)
					})
					console.log("[*] new request to "+firstRow.split(' ')[1]+" redirecting to columns on "+services['columns'].port+" "+services['columns'].ip)
					node.connect(services['columns'].port, services['columns'].ip, ()=>{
						node.write(data)
						node.on('data', (data)=>{
							sock.write(data)
							//sock.end()
						})
						node.on('end', ()=>{
							sock.end()
						})
					})
				}else if(firstRow[1].includes('/values')){
					node = new net.Socket()
					node.on('error', (err)=>{
						console.log("node err")
						console.log(err)
					})
					console.log("[*] new request to "+firstRow.split(' ')[1]+" redirecting to values on "+services['values'].port+" "+services['values'].ip)
					node.connect(services['values'].port, services['values'].ip, ()=>{
						node.write(data)
						node.on('data', (data)=>{
							sock.write(data)
							//sock.end()
						})
						node.on('end', ()=>{
							sock.end()
						})
					})
				}else{
					node = new net.Socket()
					node.on('error', (err)=>{
						console.log("node err")
						console.log(err)
					})
					console.log("[*] new request to "+firstRow.split(' ')[1]+" redirecting to resources on "+services['resources'].port+" "+services['resources'].ip)
					node.connect(services['resources'].port, services['resources'].ip, ()=>{
						node.write(data)
						node.on('data', (data)=>{
							sock.write(data)
							//sock.end()
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