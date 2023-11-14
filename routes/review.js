const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync.js');
const { reviewSchema } = require('../schema.js');
const Listing = require('../models/schema.js');
const ExpressError = require('../utils/ExpressError.js');
const Review = require('../models/review.js');
const {validateReview, isLoggedin,isRevOwner}=require("../middleware.js");
const ReviewController=require('../controllers/reviewsController.js')


// Review Route [CRUD] Operation

// Review Add Route 

router.post("/new", isLoggedin,wrapAsync(ReviewController.new));

// Review Edit Route 

router
.route("/:revid/edit")
.post(isLoggedin,isRevOwner, wrapAsync(ReviewController.editForm))
.put(isLoggedin,isRevOwner ,wrapAsync (ReviewController.edit))
// Review Delete Route 

// app.put("/edit", wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     let reviewData = await Review.findById(id);

// }));

router.delete("/:revid/delete",isLoggedin,isRevOwner ,wrapAsync(ReviewController.delete));

// Exporting Express Router for Review

module.exports=router;