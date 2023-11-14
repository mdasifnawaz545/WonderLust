const Listing = require('../models/schema')

// Index Route Controller

module.exports.index = async (req, res) => {
    let allListings = await Listing.find();
    if (!allListings) {
        throw new ExpressError(400, "Some Error has Occured");
    }
    res.render("./listings/index.ejs", { allListings });
    // Error Flash message did'nt handled here.

};

// Show Route Controller


module.exports.show = async (req, res) => {
    let { id } = req.params;
    let listingData = await Listing.findById(id).populate({ path: "review", populate: { path: "owner" }, }).populate("owner");
    if (!listingData) {
        req.flash("error", "Listing Not Found");
    }
    res.render("./listings/show.ejs", { listingData });

}

// New Route Controller

module.exports.newForm = async (req, res) => {
    res.render("./listings/new.ejs");
}

module.exports.new = async (req, res) => {
    if (!req.body.listing)
        throw new ExpressError(400, "Enter Valid Data...! Client Side Error is Caught.");
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(req.file);
    let data = new Listing(req.body.listing);
    data.image = { filename, url };
    data.owner = req.user._id;
    await data.save();
    req.flash("success", "New Listing Added Successfully");
    res.redirect("/listings");
}

// Edit Route Controller

module.exports.editForm = async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id);
    let reduceImageUrl=data.image.url;
    reduceImageUrl=reduceImageUrl.replace("/upload","/upload/h_100");
    res.render("./listings/edit.ejs", { data,reduceImageUrl });
}

module.exports.edit = async (req, res) => {
    let { id } = req.params;
    let newListing = await Listing.findByIdAndUpdate(id, req.body.listing);
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        newListing.image = { filename, url };
        await newListing.save();
    }
    req.flash("success", "Listing Edited Successfully");
    res.redirect(`/listings/${id}/show`);
}

// Edit Route Controller

module.exports.delete = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted Successfully");
    res.redirect("/listings");
}



