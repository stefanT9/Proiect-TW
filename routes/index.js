const {Router}=require('../utils/Router');
const {charts}=require('./charts');
const {statistics}=require('./statistics');
const {getIndexHTML,getIndexCSS,getIndexJS,getNavbarCSS}=require('../controller/index');

var router=new Router();
router.use('/charts',charts);
router.use('',statistics);
router.get('/',getIndexHTML);
router.get('/index', getIndexHTML);
router.get('/index.html', getIndexHTML);
router.get('/index.css', getIndexCSS);
router.get('/navbar.css', getNavbarCSS);
router.get('/index.js', getIndexJS);
module.exports.index=router;