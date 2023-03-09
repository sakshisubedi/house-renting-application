const routes = require('express').Router({mergeParams: true});
const likeController = require('../../controllers/like');

module.exports = (models) => {
    routes.post('/', likeController.like(models));
    routes.delete('/:id', likeController.unlike(models));
    return routes;
}