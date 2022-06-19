const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
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
    date: {
        type: Date,
        default: Date.now,
    },
});
CategorySchema.virtual("coverImagePath").get(function() {
    if (this.img != null && this.imgType != null) {
        return `data:${this.imgType};charset=utf-8;base64,${this.img.toString(
      "base64"
    )}`;
    }
});

module.exports = mongoose.model("Category", CategorySchema);