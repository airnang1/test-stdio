const Post = require("../models/Post");
const User = require("../models/User");
const Category = require("../models/Category");
const store = require("store2");

module.exports.dashboard = async(req, res, next) => {
    //Setting store key and data
    const category = await Category.find();
    store("auth", req.user);
    try {
        const post = await Post.find({ status: "public" });
        res.render("dashboard", {
            post,
            category,
            user: req.user,
        });
    } catch (err) {
        console.log("err: " + err);
    }
};

module.exports.all = async(req, res, next) => {
    try {
        const post = await Post.find();
        res.render("all", {
            post,
            id,
            user: req.user,
        });
    } catch (err) {
        console.log("err: " + err);
    }
};

module.exports.details = async(req, res, next) => {
    try {
        const id = req.params.id;
        const category = await Category.find();

        const post = await Post.find({ _id: id });
        res.render("detailsAll", {
            post,
            category,
        });
    } catch (err) {
        console.log("err: " + err);
    }
};