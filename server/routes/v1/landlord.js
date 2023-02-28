const routes = require('express').Router({mergeParams: true})
const landlordController = require("../../controllers/landlord")

module.exports = (models) => {
    routes.post('/', landlordController.createLandlord(models));
    routes.put('/:id', landlordController.updateLandlord(models));
    routes.get('/', landlordController.getLandlords(models));
    routes.get('/:id', landlordController.getLandlordInfoById(models));
    routes.get('/profilepic/:id', landlordController.getLandlordProfilePicById(models));
    return routes;
}