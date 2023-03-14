const routes = require('express').Router({mergeParams: true});
const listingController = require('../../controllers/listing');

/**
 * Routes to perform CRUD operations on listing
 */
module.exports = (models) => {
    routes.post('/', listingController.createListing(models));
    routes.put('/:id', listingController.updateListing(models));
    routes.get('/recommendation', listingController.getListingByRating(models));
    routes.get('/search', listingController.getListingBySearchParameter(models));
    routes.get('/landlord/:landlordId', listingController.getListingByLandlordId(models));
    routes.get('/landlord/:landlordId/rating', listingController.getAverageRatingForAllListingByLandlordId(models));
    routes.get('/:id', listingController.getListingById(models));
    routes.get('/', listingController.getListings(models));
    routes.delete('/:id', listingController.deleteListing(models));
    return routes;
}