const routes = require('express').Router({mergeParams: true});

/**
 * Redirect to appropriate routes and middleware function(s) if any
 */
module.exports = (models) => {
    routes.use('/login', require('./login')(models));
    return routes;
}