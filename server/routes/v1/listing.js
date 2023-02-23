const routes = require('express').Router({mergeParams: true});
const listingController = require('../../controllers/listing');

module.exports = (models) => {
    routes.post('/', listingController.createListing(models));
    routes.put('/:id', listingController.updateListing(models));
    routes.get('/', listingController.getListing(models));
    routes.get('/:id', listingController.getListingById(models));
    routes.get('/landlord/:id', listingController.getListingByLandlordId(models));
    routes.delete('/:id', listingController.deleteListing(models));
    return routes;
}