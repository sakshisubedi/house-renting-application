const routes = require('express').Router({mergeParams: true});
const commentController = require('../../controllers/comment');

module.exports = (models) => {
    routes.post('/', commentController.addComment(models));
    routes.get('/listing/:listingId', commentController.getCommentsByListingId(models));
    routes.delete('/:id', commentController.deleteComment(models));
    return routes;
}