const routes = require('express').Router({mergeParams: true})
const userController = require("../../controllers/user")

/**
 * Routes to perform CRUD operations on user
 */
module.exports = (models) => {
    routes.post('/', userController.createUser(models));
    routes.put('/:id', userController.updateUser(models));
    routes.get('/', userController.getUsers(models));
    routes.get('/:id', userController.getUserAllInfoById(models));
    routes.get('/public/:id', userController.getUserPublicInfoById(models));
    routes.get('/profilepic/:id', userController.getUserProfilePicById(models));
    return routes;
}