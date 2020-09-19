const Admin = require("../../model/Admin");
const Courses = require("../../model/Coures");

module.exports = {
    adminCourses: async (req, res) => {
        const id = req.params.id;
        console.log(id);
        Courses.find({ admin: id })
            .then((course) => {
                console.log(course);
                res.json({ data: course });
            })
            .catch((err) => {
                res.send("something went wrong");
                console.log(err.message);
            });
    },
};
