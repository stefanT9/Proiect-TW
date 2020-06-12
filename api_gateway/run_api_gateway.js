const {services} = require('../utils/constants')
const {Router} = require('../utils/Router')
const forward = require('http-forward')
const http = require('http')

async function usersForward(req, res)
{
	req.forward = { target: `http://${services.users.ip}:${services.users.port}` }
	forward(req, res)
}
async function columnsForward(req,res)
{
	req.forward = { target: `http://${services.columns.ip}:${services.columns.port}` }
	forward(req, res)
}
async function valuesForward(req,res)
{
	req.forward = { target: `http://${services.values.ip}:${services.values.port}` }
	forward(req, res)
}
async function resourcesForward(req,res)
{
	req.forward = { target: `http://${services.resources.ip}:${services.resources.port}` }
	forward(req, res)
}

const app = http.createServer((req, res) =>{
	console.log(`recived request at ${req.url}`)
	if(req.url.startsWith('/users') || req.url.startsWith('/auth'))
	{
		usersForward(req, res)
	}
	else if (req.url.startsWith('/columns'))
	{
		columnsForward(req, res)
	}
	else if (req.url.startsWith('/values'))
	{
		valuesForward(req, res)
	}
	else
	{
		resourcesForward(req, res)
	}
})

app.listen(80)
