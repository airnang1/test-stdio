const { mongooseToObject } = require("../util/mongoose");
const User = require("../models/User");
const store = require("store2");
const bcrypt = require("bcryptjs");
const Category = require("../models/Category");

module.exports.index = (req, res) => {
    User.find({}, (err, data) => {
        if (!err) {
            console.log(category);
            res.render("vie", { data: store("auth"), category });
        } else {
            console.log(err);
        }
    });
};

module.exports.getUpdate = async(req, res) => {
    const category = await Category.find();

    const id = store("auth")._id;
    res.render("view", { data: store("auth"), category });
};

module.exports.update = (req, res, next) => {
    const emp = {
        name: req.body.name,
        age: req.body.age,
        password: req.body.password,
        gender: req.body.gender,
    };
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            emp.password = hash;

            User.findByIdAndUpdate(
                store("auth")._id, { $set: emp }, { new: true },
                (err, data) => {
                    if (!err) {
                        console.log(emp.password);
                        res.redirect("/dashboard");
                    } else {
                        console.log(err);
                    }
                }
            );
        });
    });
};