const Mongoose = require('mongoose');

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
    uuid: {
        type: Number,
        required: true
    }
});

// Export schema
const User = Mongoose.model('user', UserSchema);

module.exports = User;