const { Route } = require('express');
const Express = require('express');
const { EnsureAuthenticated, ForwardAuthenticated } = require('../utils/auth');

const Router = Express.Router();

module.exports = function(io) {
    // Make restaurant form post
    Router.get('/restaurant', (req, res) => {
        res.render('postrestaurant');
    });

    // Make recipe form post
    Router.get('/recipe', (req, res) => {
        res.render('postrecipe');
    });

    Router.post('/restaurant', (req, res) => {
        console.log(req.body);
        res.render('postrestaurant');
    });

    // Individual post page
    Router.get('/uuid', (req, res) => {
        res.render('post');
    });

    return Router;
};