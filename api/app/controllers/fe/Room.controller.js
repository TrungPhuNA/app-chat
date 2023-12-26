const RoomModel = require("./../../models/Room.model") // new
const MessageModel = require("./../../models/Message.model") // new
const UserModel = require("./../../models/User.model") // new

exports.index = async (req, res) => {
    // destructure page and limit and set default values
    const page = req.query.page || 1;
    const page_size = req.query.page_size  || 10;

    try {
        // execute query with page and limit values
        const rooms = await RoomModel.find()
            .limit(page_size)
            .skip((page - 1) * page_size)
            .exec();

        // get total documents in the Posts collection
        const count = await RoomModel.count();

        // return response with posts, total pages, and current page
        const meta = {
            total_page: Math.ceil(count / page_size),
            total: count,
            current_page: parseInt(page),
            page_size: parseInt(page_size)
        }
        const status =  200;
        const data = {
            rooms: rooms
        }
        res.json({
            data,
            meta,
            status
        });
    } catch (err) {
        console.error(err.message);
    }
};

exports.getListsMessage = async (req, res) => {
    // destructure page and limit and set default values
    const page = req.query.page || 1;
    const page_size = req.query.page_size  || 10;
    let roomID = req.params.id;
    console.log('----------- roomID: ', roomID);
    try {
        // execute query with page and limit values

        const condition = {};
        if ( roomID ) condition.room_id = roomID;

        const messages = await MessageModel.find()
            .limit(page_size)
            .where( condition )
            .skip((page - 1) * page_size)
            .exec();

        // get total documents in the Posts collection
        const count = await MessageModel.count();

        // return response with posts, total pages, and current page
        const meta = {
            total_page: Math.ceil(count / page_size),
            total: count,
            current_page: parseInt(page),
            page_size: parseInt(page_size)
        }
        const status =  200;
        const data = {
            messages: messages
        }
        res.json({
            data,
            meta,
            status
        });
    } catch (err) {
        console.error(err.message);
    }
};

exports.store = async (req, res) => {
    // const user = await UserModel.findById(req.body.user_id);
    const room = new RoomModel({
        name: req.body.name,
        description: req.body.description,
    })
    await room.save()
    return res.status(200).json({ data: room, status : 200 });
};

exports.addChat = async (req, res) => {
    const user = await UserModel.findById(req.body.user_id);
    if (!user) {
        return res.status( 200 ).json( { message: 'Không tồn tại user', status: 400 } );
    }

    const room = await RoomModel.findById(req.body.room_id);
    if (!room) {
        return res.status( 200 ).json( { message: 'Không tồn tại phòng chat', status: 400 } );
    }
    const message = new MessageModel({
        message: req.body.message,
        description: req.body.description,
        room: room,
        user: user,
        user_id: req.body.user_id,
        room_id: req.body.room_id,
    })
    await message.save()
    return res.status(200).json({ data: message, status : 200 });
};
