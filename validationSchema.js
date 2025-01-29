// Validation for the Schema; Which is going to be triggered when someone wants to send data from an API's.

const Joi = require('joi');

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().allow("", null),
        price: Joi.number().min(0).required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
    }).required(),
});


// Why we are using this who are going to manipulate the things using API's.


const reviewSchema = Joi.object(
    {
        review: Joi.object({
            rating: Joi.number().min(1).max(5).required(),
            comment: Joi.string().required(),
        }).required(),
    });



module.exports={listingSchema,reviewSchema};