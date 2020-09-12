const Mongoose = require('mongoose');

// Create schema
// User schema
const PostRecipeSchema = new Mongoose.Schema({
    post_uuid: {type: Number, required: true},
    user_uuid: {type: Number, required: true},
    recipe_name: {type: String, required: true},
    ingredient_list: {type: [{ingredient: String, amount: String}], default: []},
    date: {type: Date, required: true},
    tag_list: {type: [String], default: []},
    view_list: {type: [Number], default: []}, 
    like_list: {type: [Number], default: []}, 
    star_list: {type: [Number], default: []},
    perm_tag: {type: String, default: 'recipe'}
});

// Export schema
const PostRecipe = Mongoose.model('post_recipe', PostRecipeSchema);

module.exports = PostRecipe;