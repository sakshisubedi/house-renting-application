const routes = require('express').Router({mergeParams: true});
const loginController = require('../../controllers/login');

module.exports = () => {
    routes.get('/', loginController.login());
    return routes;
}