const {Router}=require('../utils/Router');
const {charts}=require('./charts');
const {}=require('../controller/index');

var router=new Router();
router.use('/charts',charts);
router.get('/',(req,res)=>
{
    res.write('index');
});
router.get('/index',(req,res)=>
{
    res.write('index');
});
module.exports.index=router;