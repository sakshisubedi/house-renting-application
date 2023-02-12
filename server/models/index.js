const mongoose = require("mongoose");

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
    } catch (error) {
        console.log(error);
        // close connection
        console.log("Closing connection");
        mongoose.connection.close();
    }
}