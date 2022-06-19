const Post = require("../models/Post");
const User = require("../models/User");
const store = require("store2");
const Category = require("../models/Category");

const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

module.exports.all = async(req, res, next) => {
    const category = await Category.find();

    let auth = store("auth");
    let author = auth.name;
    try {
        const post = await Post.find({ author: author });
        res.render("addpost", {
            post,
            category,
        });
    } catch (err) {
        console.log("err: " + err);
    }
};
module.exports.changedraft = async(req, res, next) => {
    Post.findByIdAndUpdate(
        req.params.id, { $set: { status: "draft" } }, { new: true },
        (err, data) => {
            if (!err) {
                res.redirect("/products/public");
            } else {
                console.log(err);
            }
        }
    );
};
module.exports.changepublic = async(req, res, next) => {
    Post.findByIdAndUpdate(
        req.params.id, { $set: { status: "public" } }, { new: true },
        (err, data) => {
            if (!err) {
                res.redirect("/products/draft");
            } else {
                console.log(err);
            }
        }
    );
};

module.exports.add = async(req, res, next) => {
    let auth = store("auth");
    let author = auth.name;
    const { title, description, content, status, img, category } = req.body;
    if (!img) {
        res.redirect;
    }
    const post = new Post({
        title,
        description,
        content,
        status,
        author,
        category,
    });

    // SETTING IMAGE AND IMAGE TYPES
    saveImage(post, img);
    try {
        const newpost = await post.save();
        res.redirect("/products");
    } catch (err) {
        console.log(err);
    }
};

function saveImage(post, imgEncoded) {
    if (imgEncoded == null) return;

    const img = JSON.parse(imgEncoded);
    console.log("JSON parse: " + img);

    if (img != null && imageMimeTypes.includes(img.type)) {
        post.img = new Buffer.from(img.data, "base64");
        post.imgType = img.type;
    }
}
module.exports.public = async(req, res, next) => {
    const category = await Category.find();

    let auth = store("auth");
    let author = auth.name;
    const post = await Post.find({ author: author, status: "public" });
    res.render("publicPost", {
        post,
        category,
    });
};
module.exports.draft = async(req, res, next) => {
    const category = await Category.find();

    let auth = store("auth");
    let author = auth.name;
    const post = await Post.find({ author: author, status: "draft" });
    res.render("draftPost", {
        post,
        category,
    });
};

module.exports.delete = async(req, res, next) => {
    Post.findByIdAndRemove(req.params.id, (err, data) => {
        if (!err) {
            res.redirect("/products/draft");
        } else {
            console.log(err);
        }
    });
};