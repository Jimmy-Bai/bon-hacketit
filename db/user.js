const Mongoose = require('mongoose');
const { Buffer } = require('safe-buffer');

// Create schema
// User schema
const UserSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    username_lower: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pfp: {
        data: Buffer,
        contentType: String
    },
    uuid: {
        type: Number,
        required: true
    }
});

// Export schema
const User = Mongoose.model('user', UserSchema);

module.exports = User;