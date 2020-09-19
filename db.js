//mongodb connection

const mongoose = require("mongoose");

mongoose
    .connect(
        "mongodb+srv://imran:1234@fprt.ejsmo.mongodb.net/FPRT?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }
    )
    .then(function () {
        console.log("Mongo db compass connected");
    })
    .catch(function (err) {
        console.log(err.message);
    });
