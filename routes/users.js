const Express = require('express');
const Bcrypt = require('bcryptjs');
const Passport = require('passport');
const Multer = require('multer');
const GridStorage = require('multer-gridfs-storage');
const GridStream = require('gridfs-stream');
const { Collection } = require('mongoose');

const Router = Express.Router();

module.exports = function(io) {
    Router.get('/signup', (req, res) => {
        res.render('signup');
    });

    Router.get('/signin', (req, res) => {
        res.render('signin');
    });

    Router.post('/signup', async (req, res) => {
        const {
            username: _username,
            password: _password
        } = req.body;

        const _uuid = Date.now().valueOf();
        console.log(`Username: ${_username}`);
        console.log(`Password: ${_password}`);
        console.log(`UUID: ${_uuid}`);
    });

    return Router;
};