var express = require('express');
var router = express.Router();
const controllerBuilder = require('../../controllers/fe/User.controller');


router.route('/users').get(controllerBuilder.index );

module.exports = router;
