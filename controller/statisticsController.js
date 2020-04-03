const fs=require('fs');

var statistics='view/statistics';
var statisticsHTML='';
var statisticsCSS='';
var statisticsJS='';

fs.readFile(statistics+'.html', 'utf8', function(err, data) {
    statisticsHTML=data;
});
fs.readFile(statistics+'.css', 'utf8', function(err, data) {
    statisticsCSS=data;
});
fs.readFile(statistics+'.js', 'utf8', function(err, data) {
    statisticsJS=data;
});

function getstatisticsHTML(req, res) {
    try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(statisticsHTML);
    }
    catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.write('Internal server error');
    }
}
function getstatisticsCSS(req,res){
    try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        res.write(statisticsCSS);
    }
    catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/css');
        res.write('Internal server error');
    }
}
function getstatisticsJS(req,res){
    try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/javascript');
        res.write(statisticsJS);
    }
    catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.write('Internal server error');
    }
}
module.exports={getstatisticsHTML,getstatisticsCSS,getstatisticsJS};