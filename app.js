const mongoose = require('mongoose');
const {Router}=require('./utils/Router');
const http = require('http');
const {WebApp}=require('./utils/WebApp');
const constants=require('./utils/constants');
const {index}=require('./routes/index');

var router = new Router();
router.use('',index);
console.log(router)
var app    = new WebApp(constants.port,router);
app.listen();