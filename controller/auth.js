const User = require("../models/User");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const store = require("store2");

module.exports.getLogin = (req, res) => res.render("login");

module.exports.getRegister = (req, res) => res.render("register");

module.exports.postRegister = (req, res) => {
    const { name, email, password, password2, age, gender } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2 || !age || !gender) {
        errors.push({ msg: "Please enter all fields" });
    }

    if (password != password2) {
        errors.push({ msg: "Passwords do not match" });
    }

    if (password.length < 6) {
        errors.push({ msg: "Password must be at least 6 characters" });
    }

    if (errors.length > 0) {
        res.render("register", {
            errors,
            name,
            email,
            password,
            password2,
            age,
            gender,
        });
    } else {
        User.findOne({ email: email }).then((user) => {
            if (user) {
                errors.push({ msg: "Email already exists" });
                res.render("register", {
                    errors,
                    name,
                    email,
                    password,
                    password2,
                    age,
                    gender,
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password,
                    age,
                    gender,
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then((user) => {
                                req.flash(
                                    "success_msg",
                                    "You are now registered and can log in"
                                );
                                res.redirect("/users/login");
                            })
                            .catch((err) => console.log(err));
                    });
                });
            }
        });
    }
};

module.exports.postLogin = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true,
    })(req, res, next);
};

module.exports.getLogout = (req, res) => {
    req.logout();
    req.flash("success_msg", "You are logged out");
    store.remove("auth");
    res.redirect("/users/login");
};