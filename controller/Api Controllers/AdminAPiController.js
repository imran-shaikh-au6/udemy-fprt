const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const cloudinary = require("cloudinary");
//pages import
// const Product = require("../../Model/Product");
const Admin = require("../../model/Admin");

module.exports = {
    //user register route from input form
    registerAdmin: async (req, res) => {
        console.log(req.body.name);
        console.log(req.body.email);
        //checking if user already existed or not
        const admin = await Admin.findOne({ email: req.body.email });
        if (admin) {
            return res
                .status(400)
                .json({ message: "Email Already Exists, Please Login" });
        } else {
            const newUser = new Admin({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then((user) =>
                            res.json({
                                message:
                                    "Registered successfully. You can log in now",
                                user: user,
                                status: 201,
                            })
                        )
                        .catch((err) => console.log(err));
                });
            });
        }
    },

    //login user
    loginAdmin: async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        //checking for email and password match
        Admin.userFind(email, password)
            .then((user) => {
                if (!user) {
                    return res
                        .status(404)
                        .json({ message: "Invalid Creadintials" });
                }
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    video: user.video,
                    courseforSell: user.courseforSell,
                    QandAwithStudent: user.QandAwithStudent,
                };
                jwt.sign(
                    payload,
                    "secret key",
                    { expiresIn: 60 * 60 * 30 },
                    (err, token) => {
                        res.json({
                            message: "Logged in Successfully",
                            token: token,
                        });
                    }
                );
            })

            //if email or password not matches throw error
            .catch((err) => {
                res.status(401).json({ message: "Incorrect Credentials" });
            });
    },
};
