const express = require("express");
const { createActor } = require("../controllers/actor");
const { uploadImage } = require("../middlewares/multer");

const router = express.Router();

router.post("/create", uploadImage.single("avatar"), createActor);

module.exports = router;
