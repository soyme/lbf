var express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	responseHelper = require('../helper/responseHelper'),
	bookshelfService = require('./../helper/bookshelfService'),
	serviceConfig = require('./../config/serviceConfig'),
	commonUtil = require('./../utils/commonUtil');

var logger = require('log4js').getLogger('routes/index.js');

router.get('/', function(req, res) {
	res.redirect('/home');
});

router.get('/home', function(req, res) {
	var result = responseHelper.getDefaultResult(req);

	bookshelfService.getPopularCountries(function(err, countries) {
		if (err) {
			logger.error("can not load popular countries");
			result.countries = serviceConfig.defaultCountires;
			res.render('index', result);
		}

		result.countries = countries;
		res.render('index', result);
	});
});

router.get('/about', function(req,res){
	var result = responseHelper.getDefaultResult(req);
	res.render('about', result);
});

module.exports = router;
