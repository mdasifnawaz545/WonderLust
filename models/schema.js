// Schema i.e. It is used to define the shape of the document within that collection.
const Review = require('./review.js');
const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            // required: true,
            min: [3, "Title is too Short...!"],
            max: [100, "Title is too Long...!"],
        },
        description: {
            type: String,
            // required: true,
            min: [3, "Description is too Short...!"],
        },
        image: {
            filename: {
                type: String,
            },
            url: {
                type: String,
            }
        },
        price: {
            type: Number,
        },
        location: {
            type: String,
            min: [3, "Location is too Short...!"],
        },
        country: {
            type: String,
        },
        review: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        }],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    }
);


// Listing Deletion along with the Reviews.

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing.review.length) {
        let delrev = await Review.deleteMany({ _id: { $in: listing.review } });
    }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;