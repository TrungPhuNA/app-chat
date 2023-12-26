var express = require('express');
var router = express.Router();
const authBuilder = require('../../controllers/fe/Auth.controller');


router.route('/auth/register').post(authBuilder.register);
router.route('/auth/login').post(authBuilder.login);

module.exports = router;
