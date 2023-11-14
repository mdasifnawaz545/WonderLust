const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const passport = require('passport');
const { lastRedirectUrl } = require('../middleware.js');
const UserController = require('../controllers/usersController.js');

router.get("/signup", async (req, res) => {
    res.render("users/signup.ejs");
});

// Signup Routes

router
    .route("/signup")
    .get(async (req, res) => {
        res.render("users/signup.ejs");
    })
    .post(UserController.signup);

// Login Routes

router
    .route("/login")
    .get(UserController.loginForm)
    .post(lastRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), UserController.login);

// Logout Routes

router.get("/logout", UserController.logout);

module.exports = router;