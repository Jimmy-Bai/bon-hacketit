const Express = require('express');
const Multer = require('multer');
const Path = require('path');
const Crypto = require('crypto');
const RootDir = Path.dirname(require.main.filename);
const { EnsureAuthenticated, ForwardAuthenticated } = require('../utils/auth');

const Router = Express.Router();

const UserSchema = require('../db/user');
const PostRestaurantSchema = require('../db/post_restaurant');

// Multer setup
const Storage = Multer.diskStorage({
    destination: (req, file, cb) => {
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

module.exports = function (io) {
    // Homepage before login
    Router.get('/', ForwardAuthenticated, (req, res) => {
        res.render('index', {
            authenticated: req.isAuthenticated()
        });
    });

    // Home page after login
    Router.get('/dashboard', EnsureAuthenticated, async (req, res) => {
        let _user, _post;
        // If user is authenticated, get user information
        if (req.isAuthenticated) {           
            _user = await UserSchema.findOne({ uuid: req.user.uuid });
            _post = await PostRestaurantSchema.find();
        }
        console.log(_post);

        res.render('dashboard', {
            authenticated: req.isAuthenticated(),
            pfp: `/public/uploads/pfp/${_user.pfp}`,
            post_list: _post
        });
    });

    // Profile page
    Router.get('/dashboard/profile', EnsureAuthenticated, (req, res) => {
        res.render('profile', {
            authenticated: req.isAuthenticated()
        });
    });

    return Router;
};