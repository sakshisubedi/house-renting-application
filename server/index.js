const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require('morgan')
require("dotenv").config();
const $env = process.env;

const PORT = $env.PORT || 4000;

// body parser middleware
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

app.use(morgan('combined'));

let cors = require('cors')
app.use(cors())

const startServer = async () => {
    const models = await require('./models')({ $env });
    
    app.get("/test", (req, res) => {
        return res.status(200).json({
            success: true
        })
    })
    
    app.use('/api/v1', require('./routes/v1')(models));
    
    app.listen(PORT, () => {
        console.log("Server listening on", PORT);
    })
}

startServer();


