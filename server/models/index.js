const mongoose = require("mongoose");
const commentSchema = require("./comment");
const landlordSchema = require("./landlord");
const likeSchema = require("./like");
const listingSchema = require("./listing");
const ratingSchema = require("./rating");
const loadDummyData = require("./script");
const userSchema = require("./user");
const wishlistSchema = require("./wishlist");
const emailVerificationTokenSchema = require("./emailVerificationToken")
const passwordResetTokenSchema = require("./passwordResetToken")

module.exports = async ({$env}) => {
    let connection;

    try {
        mongoose.set("strictQuery", true);
        // connect to mongodb
        connection = await mongoose.connect($env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        if(!connection) {
            throw new Error('Mongo Client not initialized');
        }
        console.log("Connected to Mongo DB", $env.DB_NAME);

        // retrieve models
        const comment = connection.model('Comment', commentSchema);
        const landlord = connection.model('Landlord', landlordSchema);
        const like = connection.model('Like', likeSchema);
        const listing = connection.model('Listing', listingSchema);
        const rating = connection.model('Rating', ratingSchema);
        const user = connection.model('User', userSchema);
        const wishlist = connection.model('Wishlist', wishlistSchema);
        const emailVerificationToken = connection.model('emailVerificationToken', emailVerificationTokenSchema);
        const passwordResetToken = connection.model('passwordResetToken', passwordResetTokenSchema);

        const model = {
            comment,
            landlord,
            like,
            listing,
            rating,
            user,
            wishlist,
            emailVerificationToken,
            passwordResetToken
        }
        // populate db with dummy data
        // loadDummyData(model);
        return model;
    } catch (error) {
        console.log(error);
        // close connection
        console.log("Closing connection");
        mongoose.connection.close();
    }
}
