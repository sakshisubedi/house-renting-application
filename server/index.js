const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const morgan = require('morgan');
require("dotenv").config();
const $env = process.env;

const PORT = $env.PORT || 4000;

// body parser middleware
app.use(bodyParser.urlencoded({
    limit: '5000000mb',
    extended: true
}))
app.use(bodyParser.json());

// morgan middleware
app.use(morgan('combined'));

// cors middleware
app.use(cors());

const startServer = async () => {
    // import mongodb connection
    const models = await require('./models')({ $env });
    
    // health check routes
    app.get("/test", (req, res) => {
        return res.status(200).json({
            success: true
        })
    })
    
    // Register routes
    app.use('/api/v1', require('./routes/v1')(models));

    // serving static files
    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.resolve(__dirname, '../client', 'build')));
        app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'),function (err) {
                if(err) {
                    res.status(500).send(err)
                }
            });
        })
    }
    
    // listen for connections
    app.listen(PORT, () => {
        console.log("Server listening on", PORT);
    })
}

startServer();


