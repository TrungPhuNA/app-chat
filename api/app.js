var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
require('dotenv').config();

const mongoose = require('mongoose');

const mongoString = process.env.DATABASE_URL;
mongoose.set('strictQuery', false);
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log("===> CONNECT DB ERROR : ",error)
})

database.once('connected', () => {
    console.log('===> CONNECT DB SUCCESS');
})

var app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./app/routes/index');
var initRouterFe = require('./app/routes/fe/init');
app.use('/', indexRouter);
app.use('/api/v1/', initRouterFe);
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'pug');
app.use(logger('dev'));

// SET DOCUMENT API
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

module.exports = app;
