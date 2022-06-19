const Post = require("../models/Post");
const Category = require("../models/Category");
const store = require("store2");
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

module.exports.all = async(req, res, next) => {
    try {
        const category = await Category.find();
        res.render("categories", {
            category,
        });
    } catch (err) {
        console.log("err: " + err);
    }
};

module.exports.add = async(req, res, next) => {
    const { name, img } = req.body;
    if (!img) {
        res.redirect;
    }
    const category = new Category({
        name,
    });

    // SETTING IMAGE AND IMAGE TYPES
    saveImage(category, img);
    try {
        const newpost = await category.save();
        res.redirect("/categories");
    } catch (err) {
        console.log(err);
    }
};

function saveImage(category, imgEncoded) {
    if (imgEncoded == null) return;

    const img = JSON.parse(imgEncoded);
    console.log("JSON parse: " + img);

    if (img != null && imageMimeTypes.includes(img.type)) {
        category.img = new Buffer.from(img.data, "base64");
        category.imgType = img.type;
    }
}

module.exports.postCate = async(req, res, next) => {
    const category = await Category.find();

    const categora = await Category.find({ name: req.params.name });

    const post = await Post.find({ category: req.params.name, status: "public" });
    res.render("postCategory", {
        post,
        categora,
        category,
    });
};