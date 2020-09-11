const Mongoose = require('mongoose');

// Create schema
// User schema
const UserProfileSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    uuid: {
        type: Number,
        required: true
    },
    following_list: {
        type: [Number],
        default: []
    },
    follower_list: {
        type: [Number],
        default: []
    },
    post_list: {
        type: [Number],
        default: []
    },
    restaurant_list: {
        type: [String],
        default: []
    },
    cuisine_list: {
        type: [String],
        default: []
    }
});

// Export schema
const UserProfile = Mongoose.model('user_profile', UserProfileSchema);

module.exports = UserProfile;