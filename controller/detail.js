const Post = require("../models/Post");
const Category = require("../models/Category");

module.exports.detail = async(req, res, next) => {
    try {
        const id = req.params.id;
        const category = await Category.find();

        const post = await Post.find({ _id: id });
        res.render("detailPost", {
            post,
            category,
        });
    } catch (err) {
        console.log("err: " + err);
    }
};

module.exports.update = async(req, res, next) => {
    const img = req.body.img;
    const emp = {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        status: req.body.status,
        category: req.body.category,
    };
    const post = await Post.findByIdAndUpdate(
        req.params.id, { $set: emp }, { new: true },
        (err, data) => {
            if (!err) {
                console.log(emp);
                res.redirect("/dashboard");
            } else {
                console.log(err);
            }
        }
    );
};

function saveImage(post, imgEncoded) {
    if (imgEncoded == null) return;

    const img = JSON.parse(imgEncoded);
    console.log("JSON parse: " + img);

    if (img != null && imageMimeTypes.includes(img.type)) {
        post.img = new Buffer.from(img.data, "base64");
        post.imgType = img.type;
        const ab = { img: post.img, imgType: post.imgType };
        return ab;
    }
}
module.exports.getUpdate = async(req, res, next) => {
    const category = await Category.find();

    try {
        const post = await Post.findById(req.params.id);
        res.render("updatePost", {
            post,
            category,
        });
    } catch (err) {
        console.log("err: " + err);
    }
};