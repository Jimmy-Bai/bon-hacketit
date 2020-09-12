const Express = require('express');
const { EnsureAuthenticated, ForwardAuthenticated } = require('../utils/auth');

const Router = Express.Router();

module.exports = function(io) {
    // Homepage before login
    Router.get('/restaurant', (req, res) => {
        res.render('index');
    });

    // Home page after login
    Router.get('/recipe', (req, res) => {
        res.render('dashboard');
    });

    return Router;
};