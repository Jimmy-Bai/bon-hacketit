const Express = require('express');
const Multer = require('multer');
const Path = require('path');
const Crypto = require('crypto');
const RootDir = Path.dirname(require.main.filename);
const Moment = require('moment');
const { EnsureAuthenticated, ForwardAuthenticated } = require('../utils/auth');

const Router = Express.Router();

const Storage = Multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(RootDir + '/public/uploads/post_restaurant');
        cb(null, RootDir + '/public/uploads/post_restaurant');
    },
    filename: (req, file, cb) => {
        let filetype = '';

        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }

        cb(null, Crypto.randomBytes(20).toString('hex') + '.' + filetype);
    }
});

const Upload = Multer({ storage: Storage });
const UserProfileSchema = require('../db/user_profile');
const PostRestaurantSchema = require('../db/post_restaurant');
const UserSchema = require('../db/user');

module.exports = function (io) {
    // Make restaurant form post
    Router.get('/restaurant', EnsureAuthenticated, async (req, res) => {
        let _user;
        // If user is authenticated, get user information
        if (req.isAuthenticated) {           
            _user = await UserSchema.findOne({ uuid: req.user.uuid });
        }

        res.render('postrestaurant', {
            authenticated: req.isAuthenticated(),
            pfp: `/public/uploads/pfp/${_user.pfp}`
        });
    });

    // Make recipe form post
    Router.get('/recipe', EnsureAuthenticated, async (req, res) => {
        let _user;
        // If user is authenticated, get user information
        if (req.isAuthenticated) {           
            _user = await UserSchema.findOne({ uuid: req.user.uuid });
        }

        res.render('postrecipe', {
            authenticated: req.isAuthenticated(),
            pfp: `/public/uploads/pfp/${_user.pfp}`
        });
    });

    // Restaurant post request
    Router.post('/restaurant', Upload.any(), async (req, res) => {
        const {
            restaurant: _restaurant,
            dish: _dish_list,
            description: _desc_list,
            price: _price_list
        } = req.body;
        const _uuid = Date.now().valueOf();
        const _poster_uuid = req.user.uuid;
        const _date = Moment().format('MMMM Do, YYYY');
        let itemList = [];

        for (var i = 0; i < req.files.length; i++) {
            var temp = {};
            temp.image = req.files[i].filename;
            temp.name = _dish_list[i];
            temp.description = _desc_list[i];
            temp.price = _price_list[i];

            itemList.push(temp);
        }

        const NewPost = new PostRestaurantSchema({
            post_uuid: _uuid,
            user_uuid: _poster_uuid,
            restaurant_name: _restaurant,
            item_list: itemList,
            date: _date
        });

        await NewPost.save();
        const UserDB = await UserProfileSchema.findOne({ uuid: _poster_uuid });
        UserDB.post_list.push(_uuid);
        await UserDB.save();

        res.render('postrestaurant');
    });

    // Home page after login
    Router.get('/post', (req, res) => {
        res.render('post');
    });

    return Router;
};
