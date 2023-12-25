var express = require('express');
var router = express.Router();


const authRouter = require("./auth");
const userRouter = require("./user");

router.use(authRouter);
router.use(userRouter);

module.exports = router;
