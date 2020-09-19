const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

//user model
const user = new Schema({
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
    subscribed: {
        type: [String],
    },
    AskedQuestions: {
        type: [String],
    },
    subscription: {
        type: Schema.Types.ObjectId,
        ref: "Courses",
    },
    QandA: {
        type: Schema.Types.ObjectId,
        ref: "admins",
    },
});

//user login static method
user.statics.userFind = function (email, password) {
    var userObj = null;
    return new Promise(function (resolve, reject) {
        User.findOne({
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
module.exports = User = mongoose.model("users", user);
