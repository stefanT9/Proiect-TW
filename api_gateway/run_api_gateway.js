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
		sock.on('error', (err)=>{
			console.log('client err')
			console.log(err)
		})
		sock.on('end', ()=>{
			if(sock.node !== undefined){
				sock.node.end()
				sock.node = undefined
			}
		})
		sock.on('data', (data)=>{
			sock.node = undefined
			var dataAsString = data.toString()
			var firstRow = dataAsString.split(/\r?\n/)[0].split(' ')
			console.log(firstRow[0])
			if(["GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH"].includes(firstRow[0])){
				if(sock.node !== undefined){
					sock.node.end()
				}
				//var firstRow = dataAsString.split(/\r?\n/)[0]
				if(firstRow[1].includes('/users')){
					console.log("[*] new request to "+firstRow[1]+" redirecting to users on "+services['users'].port+" "+services['users'].ip)
					sock.node = new net.Socket()
					sock.node.on('error', (err)=>{
						console.log("node err")
						console.log(err)
					})
					sock.node.connect(services['users'].port, services['users'].ip, ()=>{
						sock.node.write(data)
						sock.node.on('data', (data)=>{
							sock.write(data)
							//sock.end()
						})
						sock.node.on('end', ()=>{
							sock.end()
						})
					})
				}else if(firstRow[1].includes('/columns')){
					sock.node = new net.Socket()
					sock.node.on('error', (err)=>{
						console.log("node err")
						console.log(err)
					})
					console.log("[*] new request to "+firstRow[1]+" redirecting to columns on "+services['columns'].port+" "+services['columns'].ip)
					sock.node.connect(services['columns'].port, services['columns'].ip, ()=>{
						sock.node.write(data)
						sock.node.on('data', (data)=>{
							sock.write(data)
							//sock.end()
						})
						sock.node.on('end', ()=>{
							sock.end()
						})
					})
				}else if(firstRow[1].includes('/values')){
					sock.node = new net.Socket()
					sock.node.on('error', (err)=>{
						console.log("node err")
						console.log(err)
					})
					console.log("[*] new request to "+firstRow[1]+" redirecting to values on "+services['values'].port+" "+services['values'].ip)
					sock.node.connect(services['values'].port, services['values'].ip, ()=>{
						sock.node.write(data)
						sock.node.on('data', (data)=>{
							sock.write(data)
							//sock.end()
						})
						sock.node.on('end', ()=>{
							sock.end()
						})
					})
				}else{
					sock.node = new net.Socket()
					sock.node.on('error', (err)=>{
						console.log("node err")
						console.log(err)
					})
					console.log("[*] new request to "+firstRow[1]+" redirecting to resources on "+services['resources'].port+" "+services['resources'].ip)
					sock.node.connect(services['resources'].port, services['resources'].ip, ()=>{
						sock.node.write(data)
						sock.node.on('data', (data)=>{
							sock.write(data)
							//sock.end()
						})
						sock.node.on('end', ()=>{
							sock.end()
						})
					})
				}
			}else{
				console.log(firstRow)
				sock.node.write(data)
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