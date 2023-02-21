const routes = require('express').Router({mergeParams: true});
const loginController = require('../../controllers/login');

module.exports = (models) => {
    routes.get('/', loginController.login(models));
    return routes;
}