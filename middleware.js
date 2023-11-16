const Listing=require('./models/schema');
const Review=require('./models/review');
const {listingSchema,reviewSchema}=require('./schema');

// Login Checking Middleware

module.exports.isLoggedin = ((req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You need to Login !");
        return res.redirect('/listings/login');
    }
    next();
});

// Original Path middleware 


module.exports.lastRedirectUrl = ((req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectLastUrl = req.session.redirectUrl;
    }
    next();
});

// Owner Middleware

module.exports.isOwner= async (req,res,next)=>{
    let {id}=req.params;
    let data=await Listing.findById(id);
    if(!data.owner._id.equals(res.locals.currUser._id))
    {
        req.flash("error","You didn't Belongs to this Listing");
        return res.redirect(`/listings/${id}/show`);
    }
    next();
}


// Review Owner Middleware

module.exports.isRevOwner= async (req,res,next)=>{
    let {id,revid}=req.params;
    let data=await Review.findById(revid);
    if(!data.owner._id.equals(res.locals.currUser._id))
    {
        req.flash("error","You didn't Belongs to this Review");
        return res.redirect(`/listings/${id}/show`);
    }
    next();
}

// Listing Middlewares


module.exports.validateListing=(req, res, next) =>{
    let { error } = listingSchema.validate(req.body.listing);
    if (error) {
        throw new ExpressError(400, "Enter Valid Values");
    }
    else {
        next();
    }
}

// Review Middlewares


module.exports.validateReview=(req, res, next) =>{
    let { error } = reviewSchema.validate(req.body.Review);
    if (error) {
        throw new ExpressError(400, "Enter Valid Reviews");
    }
    else {
        next();
    }
}
