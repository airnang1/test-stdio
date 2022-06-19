const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const store = require("store2");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const { ensureAuthenticated, forwardAuthenticated } = require("./config/auth");
const index = require("./routes/index");
const user = require("./routes/users");
const dashboard = require("./routes/user/dashboard");
const profiles = require("./routes/user/profiles");
const products = require("./routes/products");
const details = require("./routes/details");
const categories = require("./routes/categories");

const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();

// Passport Config
require("./config/passport")(passport);

// DB Config
const db = require("./config/keys").mongoURI;

const PORT = process.env.PORT || 3000;
// Connect to MongoDB
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
// Express body parser
app.use(bodyParser.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

// Express session
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

// app.use(cookieParser());

// Routes

app.use("/", index);
app.use("/users", user);
app.use("/dashboard", dashboard);
app.use("/profiles", profiles);
app.use("/products", products);
app.use("/details", details);
app.use("/categories", categories);

app.listen(PORT, () => console.log("Server is running on : " + PORT));