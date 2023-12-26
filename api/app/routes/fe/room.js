var express = require('express');
var router = express.Router();
const controllerBuilder = require('../../controllers/fe/Room.controller');


router.route('/rooms').get(controllerBuilder.index );
router.route('/rooms/add').post(controllerBuilder.store );
router.route('/rooms/message/:id').get(controllerBuilder.getListsMessage);
router.route('/rooms/message/:id').post(controllerBuilder.addChat);

module.exports = router;
