const Express = require('express');
const { EnsureAuthenticated, ForwardAuthenticated } = require('../utils/auth');

const Router = Express.Router();

module.exports = function (io) {
    // Homepage before login
    Router.get('/', ForwardAuthenticated, (req, res) => {
        res.render('index', {
            authenticated: req.isAuthenticated() ? true : false
        });
    });

    // Home page after login
    Router.get('/dashboard', EnsureAuthenticated, (req, res) => {
        res.render('dashboard', {
            authenticated: req.isAuthenticated() ? true : false
        });
    });

    // Profile page
    Router.get('/dashboard/profile', EnsureAuthenticated, (req, res) => {
        res.render('profile', {
            authenticated: req.isAuthenticated() ? true : false
        });
    });

    return Router;
};