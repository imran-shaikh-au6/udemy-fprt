const express = require("express");
const User = require("../model/User");

const router = express.Router();

const {
    registerUser,
    loginUser,
} = require("../controller/Api Controllers/UserApiController");
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

module.exports = router;
