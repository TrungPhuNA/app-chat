var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
require('dotenv').config();
const socketIo = require("socket.io");

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
app.use(cors());

var indexRouter = require('./app/routes/index');
var initRouterFe = require('./app/routes/fe/init');
const http = require("http");
app.use('/', indexRouter);
app.use('/api/v1/', initRouterFe);

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


// MAINTAIN

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:4222",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

const USER_JOIN_CHAT_EVENT = "USER_JOIN_CHAT_EVENT";
const USER_LEAVE_CHAT_EVENT = "USER_LEAVE_CHAT_EVENT";
const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";
const START_TYPING_MESSAGE_EVENT = "START_TYPING_MESSAGE_EVENT";
const STOP_TYPING_MESSAGE_EVENT = "STOP_TYPING_MESSAGE_EVENT";

io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    // Join a conversation
    const { roomId, name, picture } = socket.handshake.query;
    socket.join(roomId);

    const user = addUser(socket.id, roomId, name, picture);
    io.in(roomId).emit(USER_JOIN_CHAT_EVENT, user);

    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        const message = addMessage(roomId, data);
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, message);
    });

    // Listen typing events
    socket.on(START_TYPING_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(START_TYPING_MESSAGE_EVENT, data);
    });
    socket.on(STOP_TYPING_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(STOP_TYPING_MESSAGE_EVENT, data);
    });

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
        removeUser(socket.id);
        io.in(roomId).emit(USER_LEAVE_CHAT_EVENT, user);
        socket.leave(roomId);
    });
});

app.get("/rooms/:roomId/users", (req, res) => {
    const users = getUsersInRoom(req.params.roomId);
    return res.json({ users });
});

app.get("/rooms/:roomId/messages", (req, res) => {
    const messages = getMessagesInRoom(req.params.roomId);
    return res.json({ messages });
});


module.exports = app;
