const Listing=require('../models/schema')
const Review=require('../models/review')

// Review Add Route Controller

module.exports.new=async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing)
        throw new ExpressError(400, "Listing is Not Valid");
    let newReview = new Review(req.body.Review);
    newReview.owner=req.user._id;
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","Review Added Successfully");
    res.redirect(`/listings/${id}/show`);
}

// Review Edit Route Controller

module.exports.editForm=async(req,res)=>{
    let {id,revid}=req.params;
    let rev=await Review.findById(revid);
    let listingData=await Listing.findById(id);
    res.render("./listings/reviewEdit.ejs",{listingData,rev});
}
module.exports.edit=async(req,res)=>{
    let {id,revid}=req.params;
    let rev=await Review.findByIdAndUpdate(revid,req.body.Review);
    req.flash("success","Review Edited Successfully");
    res.redirect(`/listings/${id}/show`);
    
}

// Review Delete Route Controller

module.exports.delete=async (req, res) => {
    let { id,revid } = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {review:revid}});
    await Review.findByIdAndDelete(revid);
    req.flash("success","Review Deleted Successfully");
    res.redirect(`/listings/${id}/show`);
}
