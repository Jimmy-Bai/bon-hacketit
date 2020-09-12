const Express = require('express');
const Bcrypt = require('bcryptjs');
const Passport = require('passport');
const Fs = require('fs');
const Path = require('path');

const Router = Express.Router();

const UserSchema = require('../db/user');

module.exports = function (io) {
    Router.get('/signup', (req, res) => {
        res.render('signup');
    });

    Router.get('/signin', (req, res) => {
        res.render('signin');
    });

    // Signup POST request
    Router.post('/signup', async (req, res) => {
        // Parse input from form
        const {
            username: _username,
            password: _password,
            password2: _password2,
            image: _image
        } = req.body;

        const _uuid = Date.now().valueOf();

        console.log(`Username: ${_username}`);
        console.log(`Password: ${_password}`);
        console.log(`Password 2: ${_password2}`);
        console.log(`UUID: ${_uuid}`);

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