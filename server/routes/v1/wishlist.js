const routes = require('express').Router({mergeParams: true})
const wishlistController = require("../../controllers/wishlist")

module.exports = (models) => {
    routes.post('/', wishlistController.createWishlistItem(models));
    routes.get('/:id', wishlistController.getWishlistByUserId(models));
    routes.delete('/:id', wishlistController.deleteWishlistItem(models));
    return routes;
}