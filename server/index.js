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

// for testing using port 8000 ********************
require("express-async-errors");
const mongoose = require('mongoose');
const userRouter = require("./routes/v1/login");
const { handleNotFound } = require("./utils/helper");
const { errorHandler } = require("./utils/auth");

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('db is connected!')
    })
    .catch((ex) => {
        console.log('db connection failed: ', ex)
    })

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/user", userRouter);
app.use("/*", handleNotFound);
app.use(errorHandler);
app.listen(8000, () => {
    console.log("the port is listening on port 8000");
  });  
// ***********************************

// const startServer = async () => {
//     const models = await require('./models')({ $env });
    
//     app.get("/test", (req, res) => {
//         return res.status(200).json({
//             success: true
//         })
//     })
    
//     app.use('/api/v1', require('./routes/v1')(models));
    
//     app.listen(PORT, () => {
//         console.log("Server listening on", PORT);
//     })
// }

// startServer();


