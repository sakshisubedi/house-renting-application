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
    extended: true
}))
app.use(bodyParser.json());

app.use(morgan('combined'));
app.use(cors());

const startServer = async () => {
    const models = await require('./models')({ $env });

    // serving static files
    console.log("build-path", path.join(__dirname, '../build'));
    
    app.get("/test", (req, res) => {
        return res.status(200).json({
            success: true
        })
    })
    
    app.use('/api/v1', require('./routes/v1')(models));

    app.use(express.static(path.join(__dirname, '../build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build'))
    })
    
    app.listen(PORT, () => {
        console.log("Server listening on", PORT);
    })
}

startServer();


