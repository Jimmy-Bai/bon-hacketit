const Express = require('express');
const Bcrypt = require('bcryptjs');
const Passport = require('passport');
const Multer = require('multer');
const Path = require('path');
const Crypto = require('crypto');
const RootDir = Path.dirname(require.main.filename);

const Router = Express.Router();

const UserSchema = require('../db/user');

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
    Router.get('/signup', (req, res) => {
        res.render('signup');
    });

    Router.get('/signin', (req, res) => {
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

        console.log(`Username: ${_username}`);
        console.log(`Password: ${_password}`);
        console.log(`Password 2: ${_password2}`);
        console.log(`UUID: ${_uuid}`);
        console.log(req.file);

        res.redirect('/users/signup');
    });

    // Sign in POST request
    Router.post('/signin', async (req, res) => {
        const {
            username: _username,
            password: _password
        } = req.body;

        console.log(`Username: ${_username}`);
        console.log(`Password: ${_password}`);
    });

    return Router;
};