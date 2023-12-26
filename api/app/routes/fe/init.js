var express = require('express');
var router = express.Router();


const authRouter = require("./auth");
const userRouter = require("./user");
const roomRouter = require("./room");

router.use(authRouter);
router.use(roomRouter);
router.use(userRouter);

module.exports = router;
