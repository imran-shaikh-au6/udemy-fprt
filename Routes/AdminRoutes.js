const express = require("express");
const Admin = require("../model/Admin");

const router = express.Router();

const {
    registerAdmin,
    loginAdmin,
} = require("../controller/Api Controllers/AdminAPiController");
const {
    adminCourses,
} = require("../controller/Normal Controllers/AdminNormalController");
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.get("/admincourses/:id", adminCourses);
module.exports = router;
