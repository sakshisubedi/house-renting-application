const routes = require('express').Router({mergeParams: true});
const ratingController = require('../../controllers/rating');

module.exports = (models) => {
    routes.post('/', ratingController.addRating(models));
    routes.put('/:id', ratingController.updateRating(models));
    routes.get('/user/:userId/listing/:listingId', ratingController.getRatingByUserId(models));
    return routes;
}