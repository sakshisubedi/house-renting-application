const routes = require('express').Router({mergeParams: true})
const userController = require("../../controllers/user")

module.exports = (models) => {
    routes.post('/', userController.createUser(models));
    routes.put('/', userController.updateUser(models));
    routes.get('/', userController.getUsers(models));
    routes.get('/:id', userController.getUserById(models));
}