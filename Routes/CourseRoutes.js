const Admin = require("../model/Coures");
const express = require("express");
const router = express.Router();
const upload = require("../Config/multer");

const {
    addNewCourse,
    getAllCources,
} = require("../controller/Api Controllers/CourseApiController");
const { UploadStream } = require("cloudinary");
router.post("/addNewCourse", upload.array("image", 3), addNewCourse);
router.get("/getallcourse", getAllCources);

module.exports = router;
