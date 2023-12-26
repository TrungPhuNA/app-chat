const mongoose = require('mongoose');

const { Schema } = mongoose;

const roomSchema = new Schema(
    {
        name: {
            type: String,
        },
        user:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        created_at : { type: Date, default: Date.now },
    },
    { collection: 'rooms' }
);

module.exports = mongoose.model('Room', roomSchema);
