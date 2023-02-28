const routes = require('express').Router({mergeParams: true})
const wishlistController = require("../../controllers/wishlist")

module.exports = (models) => {
    routes.post('/', wishlistController.createWishlistItem(models));
    routes.get('/:userId', wishlistController.getWishlistByUserId(models));
    routes.delete('/user/:userId/listing/:listingId', wishlistController.deleteWishlistItem(models));
    // routes.get('/', wishlistController.getWishlistItems(models));
    return routes;
}