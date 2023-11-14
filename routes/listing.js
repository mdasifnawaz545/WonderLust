const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/expressError.js');
const { listingSchema } = require('../schema.js');
const Listing = require('../models/schema.js');
const { isLoggedin, isOwner, lastRedirectUrl } = require("../middleware.js");
const { validateListing } = require("../middleware.js");
const ListingController = require('../controllers/listingController.js');
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });

// Listing Routes 

// Index Route

router.get("/", wrapAsync(ListingController.index));

// Show Route

router.get("/:id/show", wrapAsync(ListingController.show));

// Create/New Route

router
    .route("/new")
    .get(isLoggedin, wrapAsync(ListingController.newForm))
    .post(upload.single("listing['image.url']"),isLoggedin,wrapAsync(ListingController.new))


// Edit Route

router
    .route("/:id/edit")
    .get(isLoggedin, isOwner, wrapAsync(ListingController.editForm))
    .put(upload.single("listing['image.url']"),wrapAsync(ListingController.edit));

// Delete Route

router.delete("/:id/delete", isLoggedin, isOwner, wrapAsync(ListingController.delete));

// Exporting Express Router for Listings

module.exports = router;