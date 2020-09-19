const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Product model
const CourcesSchema = new Schema({
    //owner of product
    admin: {
        type: Schema.Types.ObjectId,
        ref: "admins",
    },
    title: {
        type: String,
    },
    category: {
        type: String,
    },
    price: {
        type: Number,
    },
    description: {
        type: String,
    },
    coupon: {
        type: String,
    },
    revenue: {
        type: String,
    },
    languages: {
        type: [String],
    },
    cp: {
        type: String,
    },
    video: {
        type: [String],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Course = mongoose.model("Courses", CourcesSchema);
