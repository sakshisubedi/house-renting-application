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
    
    app.get("/test", (req, res) => {
        return res.status(200).json({
            success: true
        })
    })
    
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
    
    app.listen(PORT, () => {
        console.log("Server listening on", PORT);
    })
}

startServer();


