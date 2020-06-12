const {services} = require('../utils/constants')
const {Router} = require('../utils/Router')
const forward = require('http-forward')
const http = require('http')

async function usersForward(req, res)
{
	req.forward = { target: `http://${services.users.ip}:${services.users.port}` }
	console.log(req.forward)

	forward(req, res)
}
async function columnsForward(req,res)
{
	req.forward = { target: `http://${services.columns.ip}:${services.columns.port}` }
	console.log(req.forward)

	forward(req, res)
}
async function valuesForward(req,res)
{
	req.forward = { target: `http://${services.values.ip}:${services.values.port}` }
	console.log(req.forward)
	forward(req, res)
}
async function resourcesForward(req,res)
{
	req.forward = { target: `http://${services.resources.ip}:${services.resources.port}` }
	console.log(req.forward)

	forward(req, res)
}

const app = http.createServer((req, res) =>{
	console.log(`recived request at ${req.url}`)
	if(req.url.startsWith('/users') || req.url.startsWith('/auth'))
	{
		console.log('routed to user service')
		usersForward(req, res)
	}
	else if (req.url.startsWith('/columns'))
	{
		console.log('routed to columns service')
		columnsForward(req, res)
	}
	else if (req.url.startsWith('/values'))
	{
		console.log('routed to values service')
		valuesForward(req, res)
	}
	else
	{
		console.log('routed to resources service')
		resourcesForward(req, res)
	}
})

app.listen(80)
