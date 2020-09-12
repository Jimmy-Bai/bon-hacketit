const Mongoose = require('mongoose');

// Create schema
// User schema
const PostRestaurantSchema = new Mongoose.Schema({
    post_uuid: {type: Number, required: true},
    user_uuid: {type: Number, required: true},
    restaurant_name: {type: String, required: true},
    item_list: {type: [{image: String, name: String, description: String, price: String}],default: []},
    date: {type: Date, required: true},
    tag_list: {type: [String], default: []},
    view_list: {type: [Number], default: []}, 
    like_list: {type: [Number], default: []}, 
    star_list: {type: [Number], default: []},
    perm_tag: {type: String, default: 'restaurant'}
});

// Export schema
const PostRestaurant = Mongoose.model('post_restaurant', PostRestaurantSchema);

module.exports = PostRestaurant;