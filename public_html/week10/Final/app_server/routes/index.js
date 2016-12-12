var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');

router.all('/', ctrlHome.home);
router.all('/index', ctrlHome.home);
router.all('/add', ctrlHome.add);
router.all('/view/:id?', ctrlHome.home);

module.exports = router;
