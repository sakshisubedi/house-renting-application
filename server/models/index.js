const mongoose = require("mongoose");
const commentSchema = require("./comment");
const landlordSchema = require("./landlord");
const likeSchema = require("./like");
const listingSchema = require("./listing");
const ratingSchema = require("./rating");
const loadDummyData = require("./script");
const userSchema = require("./user");
const wishlistSchema = require("./wishlist");

module.exports = async ({$env}) => {
    let connection;

    try {
        mongoose.set("strictQuery", true);
        connection = await mongoose.connect($env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        if(!connection) {
            throw new Error('Mongo Client not initialized');
        }
        console.log("Connected to Mongo DB", $env.DB_NAME);
        const comment = connection.model('Comment', commentSchema);
        const landlord = connection.model('Landlord', landlordSchema);
        const like = connection.model('Like', likeSchema);
        const listing = connection.model('Listing', listingSchema);
        const rating = connection.model('Rating', ratingSchema);
        const user = connection.model('User', userSchema);
        const wishlist = connection.model('Wishlist', wishlistSchema);

        const model = {
            comment,
            landlord,
            like,
            listing,
            rating,
            user,
            wishlist
        }
        // populate db
        // loadDummyData(model);
        return model;
    } catch (error) {
        console.log(error);
        // close connection
        console.log("Closing connection");
        mongoose.connection.close();
    }
}