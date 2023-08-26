# Server
This is the backend code of the House Renting Application written in [Node.js](https://nodejs.org/en). Additionally, it uses [Express.js](https://expressjs.com/) as a web framework for Node.js.

## Getting Started

### Requirements
This folder depends on `npm`, `docker`, and `docker-compose`. You may also want to separately install `MongoDB`, although this is not required it can be pulled by docker.

You will also want to create `.env` file while copying these keys and providing the values

```
DB_NAME=<database_name>
DB_URL=<mongodb_url>
PORT=<port>
NODE_ENV=<development/production>
JWT_SECRET=<jwt_secret_key>
```
### Setup
- Run `nvm use` to temporarily set a specific version of Node.js.
- Run `npm install` to install dependencies.

### Running the dev server
Run the docker compose file to start the MongoDB server. This can either be done in the foreground to see logs:

```docker-compose up```

Or in the background (detached):

```docker-compose up -d```

Run the dev server: 

```node index.js```

The application will be accessible at PORT which is provided in `.env` file.

## Project Structure
This project uses the [Node.js](https://nodejs.org/en) and [Express.js](https://expressjs.com/) framework/stack and so the directory structure follows the general Node.js and Express.js project structure. Some notable subdirectories of `server` include:
- `controllers/`: It includes business logic for the exposed endpoints. It acts as an intermediary, handling user input, processing requests, and orchestrating interactions between the Model and View components.
- `models/`: Has the application's data, logic, and rules, managing data integrity, operations, and communication with the database. It also has logic to making `MongoDB` database connection.
- `routes/v1/`: It exposes the API endpoints for the requests.

Generated directories include `node_modules`

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
    - Expects *pageNum* and *numListings* for query params.
    - Gets all wishlist items corresponding to the given user id.
- **getInterestedPeopleByListingId**: GET `/wishlist/interested/:id`
    - PARAMS: id
    - Expects *pageNum* and *numPeople* for query params.
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
    - Expects *pageNum* and *numListings* for query params.
    - Gets all listings sorted by rating in descending order.
- **getListingBySearchParameter**: GET `/listing/search`
    - Expects *pageNum* and *numListings* for query params.
    - Gets all listings depending on a given search parameter.
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
    - Expects *pageNum* and *numListings* for query params.
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

