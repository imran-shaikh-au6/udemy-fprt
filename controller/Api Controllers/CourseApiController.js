const cloudinary = require("cloudinary").v2;
// let multiparty = require("multiparty");
// const fs = require("fs");
// const path = require("path");

//pages import
const upload = require("../../Config/passport");
const User = require("../../model/User");
const Coures = require("../../model/Coures");
const Admin = require("../../model/Admin");

module.exports = {
    //adding new product only for registerd user
    addNewCourse: async (req, res) => {
        const capitalLetters = (s) => {
            return s
                .trim()
                .split(" ")
                .map((i) => i[0].toUpperCase() + i.substr(1))
                .reduce((ac, i) => `${ac} ${i}`);
        };
        const title1 = req.body.title;
        const mainTitle = capitalLetters(title1);

        //new object of product
        const newProduct = {
            admin: req.body.id,
            title: mainTitle,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description,
            coupon: req.body.coupon,
            revenue: req.body.revenue,
        };

        //saving new product
        const saveProduct = (product) => {
            let newPro = new Coures(product);
            newPro
                .save()
                .then((savedProduct) => {
                    console.log(savedProduct);
                    Admin.findByIdAndUpdate(
                        { _id: savedProduct.admin },
                        { $push: { courseforSell: savedProduct._id } },
                        { new: true }
                    )
                        .then((user) =>
                            res.json({
                                massage: "Uploaded Succesfully",
                                data: user,
                            })
                        )
                        .catch((error) => console.log(error));
                })
                .catch((error) => console.log(error));
        };
        if (req.files.length > 0) {
            let images = [];

            //uploading an image to cloudinary
            req.files.map(async (val, ind) => {
                let wait = await cloudinary.uploader.upload(val.path, function (
                    error,
                    response
                ) {
                    if (error) {
                        console.log("err", error);
                    }
                });
                images.push(wait.url);
                if (images.length === req.files.length) {
                    const data = (newProduct.video = images);
                    console.log(data);

                    saveProduct(newProduct);
                }
            });
        } else {
            saveProduct(newProduct);
        }
    },
    getAllCources: async (req, res) => {
        const course = Coures.find()
            .then((data) => {
                console.log(data);
                res.send(data);
            })
            .catch((error) => {
                res.status(400).send("No Cources Found");
            });
    },
};
