var express = require('express');
var router = express.Router();
var ctrlAbout = require('../controllers/about');

/* GET form page. */
router.get('/', ctrlAbout.about);

module.exports = router;