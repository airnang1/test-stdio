module.exports.prpostCreate = function(req, res, next) {
    var errors = [];
    if (!req.body.title) {
        errors.push("title is required.");
    }

    if (!req.body.description) {
        errors.push("description is required.");
    }
    if (!req.body.content) {
        errors.push("content is required.");
    }
    if (!req.body.description) {
        errors.push("description is required.");
    }
    if (!req.body.img) {
        errors.push("Image is required.");
    }
    if (errors.length) {
        res.render(`products/${store("auth").id}`, {
            errors: errors,
            values: req.body,
        });
        return;
    }
    res.locals.success = true;

    next();
};