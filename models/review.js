const mongoose = require('mongoose');
let reviewSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
        },
        comment: {
            type: String,
            min: 3,
        },
        created_at: {
            type: Date,
            default: Date.now(),
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    }
    
)
module.exports = mongoose.model("Review", reviewSchema);