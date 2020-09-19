const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

//user model
const admin = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    token: {
        type: String,
        default: "",
    },
    video: {
        type: [String],
    },
    courseforSell: {
        type: [String],
    },
    QandAwithStudent: {
        type: [String],
    },
    courses: {
        type: Schema.Types.ObjectId,
        ref: "Courses",
    },
    QandA: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
});

//user login static method
admin.statics.userFind = function (email, password) {
    var userObj = null;
    return new Promise(function (resolve, reject) {
        Admin.findOne({
            email: email,
        })
            .then(function (user) {
                console.log(user);
                if (!user) {
                    return reject("Incorrect Credintials");
                }
                userObj = user;
                return bcrypt.compare(password, user.password);
            })
            .then(function (isMatched) {
                if (!isMatched) return reject("Incorrect credentials");
                resolve(userObj);
            })
            .catch(function (err) {
                reject(err);
            });
    });
};
module.exports = Admin = mongoose.model("admins", admin);
