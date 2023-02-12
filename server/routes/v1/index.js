const routes = require('express').Router({mergeParams: true});

/**
 * Redirect to appropriate routes and middleware function(s) if any
 */
module.exports = () => {
    routes.use('/login', require('./login')());
    return routes;
}