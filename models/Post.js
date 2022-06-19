const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    // https://mongoosejs.com/docs/schematypes.html#buffers
    img: {
        type: Buffer,
        required: true,
    },
    imgType: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
PostSchema.virtual("coverImagePath").get(function() {
    if (this.img != null && this.imgType != null) {
        return `data:${this.imgType};charset=utf-8;base64,${this.img.toString(
      "base64"
    )}`;
    }
});

module.exports = mongoose.model("Post", PostSchema);