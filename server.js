const express = require("express");
const app = express();
const dotenv = require("dotenv");
require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;
require("./Utils/cloudinary");

const user = require("./Routes/userRoutes");
const admin = require("./Routes/AdminRoutes");
const course = require("./Routes/CourseRoutes");
dotenv.config();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(express.static("client/build"));
console.log(path.__dirname);
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.use(user);
app.use(admin);
app.use(course);
app.listen(PORT, () => console.log("server started"));
