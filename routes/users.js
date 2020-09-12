const Express = require('express');
const Bcrypt = require('bcryptjs');
const Passport = require('passport');
const Multer = require('multer');
const Path = require('path');
const Crypto = require('crypto');
const RootDir = Path.dirname(require.main.filename);
const { EnsureAuthenticated, ForwardAuthenticated } = require('../utils/auth');

const Router = Express.Router();

const UserSchema = require('../db/user');
const UserProfileSchema = require('../db/user_profile');

// Multer setup
const Storage = Multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, RootDir + '/uploads/pfp');
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
    Router.get('/signup', ForwardAuthenticated, (req, res) => {
        res.render('signup');
    });

    Router.get('/signin', ForwardAuthenticated, (req, res) => {
        res.render('signin');
    });

    // Signup POST request
    Router.post('/signup', Upload.single('image'), async (req, res) => {
        const {
            username: _username,
            password: _password,
            password2: _password2
        } = req.body;
        const _uuid = Date.now().valueOf();
        const userDB = await UserSchema.findOne({ username_lower: _username.toLowerCase() });
        let msg = [];

        // Verify that username is unique and password and password2 is the same
        if (userDB) {
            msg.push({ msg: 'Username already exist. Please change your username.' });
        }

        if (_password !== _password2) {
            msg.push({ msg: 'Password does not match! Please check and retype password.' });
        }

        // If there is more than 0 error message, rerender current page
        if (msg.length > 0) {
            res.render('signup', {
                msg: msg
            });
        } else {
            // Create a new user and user profile
            // Hash password first
            Bcrypt.genSalt(10, (error, salt) => {
                if (error) {
                    console.log(error);
                    throw error;
                } else {
                    Bcrypt.hash(_password, salt, async (error, hash) => {
                        const NewUser = new UserSchema({
                            username: _username,
                            username_lower: _username.toLowerCase(),
                            password: hash,
                            pfp: req.file ? req.file.filename : 'default.png',
                            uuid: _uuid
                        });

                        const NewUserProfile = new UserProfileSchema({
                            username: _username,
                            uuid: _uuid
                        });

                        await NewUser.save();
                        await NewUserProfile.save();
                        res.redirect('/users/signin');
                    });
                }
            });
        }
    });

    // Sign in POST request
    Router.post('/signin', (req, res, next) => {
        Passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/users/signin',
            failureFlash: true
        })(req, res, next);
    });

    // Sign out GET request
    Router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/users/signin');
    });

    return Router;
};