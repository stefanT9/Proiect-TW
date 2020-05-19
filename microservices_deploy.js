const { Router } = require('./utils/Router')
const { WebApp } = require('./utils/WebApp')
const constants = require('./utils/constants')
//const { index } = require('./routes/index')
const { usersRouter } = require('./routes/users')
const { columnsRouter } = require('./routes/columns')
const { valuesRouter } = require('./routes/values')
const { resourcesRouter } = require('./routes/resources')

try{
	var microServiceName = process.argv[2]
	var port = parseInt(process.argv[3])
}catch(err){
	console.log("[!] You must provide a microservice name and a port")
}

if(microServiceName === "users"){
	const router = new Router()
	router.use('', usersRouter)
	console.log(router)

	const app = new WebApp(port, usersRouter, constants.db_url_users, 'users')
	app.listen()

	console.log("[*] Users microservice is running")
}else if(microServiceName === "columns"){
	const router = new Router()
	router.use('', columnsRouter)
	console.log(router)

	const app = new WebApp(port, columnsRouter, constants.db_url_columns, 'columns')
	app.listen()

	console.log("[*] Columns microservice is running")
}else if(microServiceName === "values"){
	const router = new Router()
	router.use('', valuesRouter)
	console.log(router)

	const app = new WebApp(port, valuesRouter, constants.db_url_values, 'values')
	app.listen()

	console.log("[*] Values microservice is running")
}else if(microServiceName === "resources"){
	const router = new Router()
	router.use('', resourcesRouter)
	console.log(router)

	const app = new WebApp(port, resourcesRouter, undefined, 'resources')
	app.listen()

	console.log("[*] Resources microservice is running")
}else{
	console.log("[!] No such service")
}
