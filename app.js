// Cloudinary Cloud Data Storage Setup

if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

// Requiring Express

const express = require('express');
let app = express();
const path = require('path');
let port = 8080;
app.listen(port, () => {
    console.log(`Listening to Port No.${port}`);
});


// Using Passport for Authentication

const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user.js');

// we are going to implement the Passport just after the session part as it requires session to implement.

// Using Session
// Connecting with DB
const mongoose = require('mongoose');
const atlasDB=process.env.ATLASDB_URL;
const session = require('express-session');
const MongoStore=require('connect-mongo');
const flash = require('connect-flash');

const store=MongoStore.create({
    mongoUrl:atlasDB,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,

})

store.on("error",(err)=>{
    console.log("Error in Mongo Session Store",err);
});

const sessionOption = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};


app.use(session(sessionOption));
app.use(flash());



main().then(() => {
    console.log("Connected With DataBase");
}).catch((err) => {
    console.log("Not Connected With DataBase");
});
async function main() {
    await mongoose.connect(atlasDB);
};

// Passport or Authentication Implementation of Passport

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash Middleware

app.use((req, res, next) => {
    res.locals.successListing = req.flash("success");
    res.locals.errorListing = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

// Requiring Router

const listingRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');

// Middleware Files Require

const ExpressError = require('./utils/expressError.js');

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Error Caught" } = err;
    res.render("./listings/error.ejs", { message });
    // res.status(statusCode).send(message);
});

// EJS Mate used for using a Bolerplate in our Development Process.

const ejsMate = require('ejs-mate');
app.engine("ejs", ejsMate);
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.static("/","listings"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "listings")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Using EJS

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Using Reiew Schema

const Review = require('./models/review.js');
const { func } = require("joi");

// Listing Route[CRUD] Operations

app.use("/listings", listingRouter);

// Review Route [CRUD] Operation

app.use("/listings/:id/review", reviewRouter);

// User Route [CRUD] Operation

app.use("/", userRouter);

// Page Not Found Error Handler

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});
