const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema(
    {
        message: {
            type: String,
        },
        room_id: {type: String},
        user_id: {type: String},
        user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        room:     { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
        created_at : { type: Date, default: Date.now },
    },
    { collection: 'messages' }
);

module.exports = mongoose.model('Message', messageSchema);
