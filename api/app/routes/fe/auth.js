var express = require('express');
var router = express.Router();
const authBuilder = require('../../controllers/fe/Auth.controller');


router.route('/auth/register').post(authBuilder.register);

module.exports = router;
