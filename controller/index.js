const fs=require('fs');

var indexPath='view/index';
var navBarPath='view/navbar';
var indexHTML='';
var indexCSS='';
var indexJS='';
var navBarCSS='';

fs.readFile(indexPath+'.html', 'utf8', function(err, data) {
    indexHTML=data;
});
fs.readFile(indexPath+'.css', 'utf8', function(err, data) {
    indexCSS=data;
});
fs.readFile(navBarPath+'.css', 'utf8', function(err, data) {
    navBarCSS=data;
});
fs.readFile(indexPath+'.js', 'utf8', function(err, data) {
    indexJS=data;
});

function getIndexHTML(req, res) {
    try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(indexHTML);
    }
    catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.write('Internal server error');
    }
}
function getIndexCSS(req,res){
    try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        res.write(indexCSS);
    }
    catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/css');
        res.write('Internal server error');
    }
}
function getNavbarCSS(req,res) {
    try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        res.write(navBarCSS);
    }
    catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/css');
        res.write('Internal server error');
    }
}
function getIndexJS(req,res){
    try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/javascript');
        res.write(indexJS);
    }
    catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.write('Internal server error');
    }
}
module.exports={getIndexHTML,getIndexCSS,getIndexJS,getNavbarCSS};