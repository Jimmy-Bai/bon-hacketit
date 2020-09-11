const Express = require('express');
const Bcrypt = require('bcryptjs');
const Passport = require('passport');

const Router = Express.Router();

module.exports = function(io) {
    Router.get('/signup', (req, res) => {
        res.render('signup');
    });

    Router.get('/signin', (req, res) => {
        res.render('signin');
    });

    return Router;
};