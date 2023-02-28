const routes = require('express').Router({mergeParams: true});

/**
 * Redirect to appropriate routes and middleware function(s) if any
 */
module.exports = (models) => {
    routes.use('/login', require('./login')(models));
    routes.use('/listing', require('./listing')(models));
    routes.use('/rating', require('./rating')(models));
    routes.use('/user', require('./user')(models));
    return routes;
}