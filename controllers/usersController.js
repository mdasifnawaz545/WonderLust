const express=require('express');
const User=require("../models/user")

// Signup Controller Routes 

module.exports.signup=async (req, res, next) => {
    try {
        let { email, username, password } = req.body;
        let newUser = new User({ email, username });
        let userRegistered = await User.register(newUser, password);
        req.login(userRegistered, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome, To The WonderLust World");
            let lastURL=res.locals.redirectLastUrl || "/"
            res.redirect(lastURL);
        });
    }
    catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}

// Login Controller Routes 

module.exports.loginForm=async (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login=async (req, res) => {
    let redirect="/";
    req.flash("success", "Welcome Back to WonderLust ! You are Logged In");
    res.redirect(redirect);
}

// Logout Controller Routes 


module.exports.logout= async(req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logout Successfully !");
        res.redirect("/");
    })
}