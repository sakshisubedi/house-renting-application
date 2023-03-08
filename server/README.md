# Server

To make a request to these APIs, run the server with `node index.js` at the server/ directory, which runs on port 4000.

Make a request to the url: "localhost:4000" + base route + API route (as listed below)

Example: To get a user's info with id 123456789, make a GET request to `localhost:4000/api/v1/user/123456789` with the necessary fields in the request body.

## Routes
Base route: `/api/v1`

### __User(Tenant)__ API
- **createUser**: POST `/user`
    - Creates a new user and saves it to database.
- **updateUser**: PUT `/user/:id`
    - PARAMS: id
    - Update user information for a given user id.
- **getUsers**: GET `/user`
    - Gets all users in the database.
- **getUserAllInfoById**: GET `/user/:id`
    - PARAMS: id
    - Gets the user that corresponds to the given user id.
- **getUserPublicInfoById**: GET `/user/public/:id`
    - PARAMS: id
    - Gets the public information of the user that corresponds to the given user id.
- **getProfilePicById**: GET `/user/profilepic/:id`
    - PARAMS: id
    - Gets the profile picture of the user that corresponds to the given user id.

### __Landlord API__
- **createLandlord**: POST `/landlord`
    - Creates a new landlord and saves it to database.
- **updateUser**: PUT `/landlord/:id`
    - PARAMS: id
    - Update landlord information for a given landlord id.
- **getLandlordInfoById**: GET `/landlord/:id`
    - PARAMS: id
    - Gets the landlord that corresponds to the given landlord id.
- **getProfilePicById**: GET `/landlord/profilepic/:id`
    - PARAMS: id
    - Gets the profile picture of the landlord that corresponds to the given landlord id.

### __Wishlist API__
- **createWishlistItem**: POST `/wishlist`
    - Creates a new wishlist item and saves it to database.
- **getWishlistByUserId**: GET `/wishlist/:id`
    - PARAMS: id
    - Gets all wishlist items corresponding to the given user id.
- **getInterestedPeopleByListingId**: GET `/wishlist/interested/:id`
    - PARAMS: id
    - Gets all wishlist items corresponding to the given listing id, i.e. the list of people interested in a listing.
- **getIsWishlistedByUser**: GET `/wishlist/user/:userId/listing/:listingId`
    - PARAMS: userId, listingId
    - Checks if there exists a document in the database with the specified userId, listingId pair.
    - Returns a boolean.
- **deleteWishlistItem**: DELETE `/wishlist/:id`
    - PARAMS: id
    - Deletes the wishlist item that corresponds to the given wishlist id.

### __Listing API__
- **createListing**: POST `/listing`
    - Creates a new listing and saves it to database.
- **updateListing**: PUT `/listing/:id`
    - PARAMS: id
    - Update listing information for a given listing id.
- **getListingByRating**: GET `/listing/recommendation`
    - Gets all listings sorted by rating in descending order.
- **getListingBySearchParameter**: GET `/listing/search`
    - Gets all listings depending on a given search parameter.
    - Currently supports only postalCode as a search parameter.
- **getListingByLandlordId**: GET `/listing/landlord/:landlordId`
    - PARAMS: landlordId
    - Gets all listings associated with the given landlord id.
- **getAverageRatingForAllListingByLandlordId**: GET `/listing/landlord/:landlordId/rating`
    - PARAMS: landlordId
    - Gets average rating and review count for all listings corresponding to given landlord id.
- **getListingById**: GET `/listing/:id`
    - PARAMS: id
    - Gets the listing that corresponds to the given listing id.
- **getListings**: GET `/listing`
    - Gets all listings in the database.
- **deleteListing**: DELETE `/listing/:id`
    - PARAMS: id
    - Deletes the listing that corresponds to the given listing id.

### __Comment API__
- **addComment**: POST `/comment`
    - Adds a new comment and saves it to database.
- **getCommentsByListingId**: GET `/comment/listing/:listingId`
    - PARAMS: listingId
    - Gets all comments corresponding to the given listing id
- **deleteComment**: DELETE `/comment/:id`
    - PARAMS: id
    - Deletes the comment that corresponds to the given comment id.

### __Like API__
- **like**: POST `/like`
    - Adds a like and saves it to database.
- **unlike**: DELETE `/like/:id`
    - PARAMS: id
    - Delete like for given like id

