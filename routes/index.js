const Express = require('express');
const Bcrypt = require('bcryptjs');
const Passport = require('passport');

const Router = Express.Router();

module.exports = function(io) {
    Router.get('/', (req, res) => {
        res.render('index');
    });

    return Router;
};