const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


// Configuring Cloud with the Backend

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
});

// Defining the folder for the Cloud Storage.

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:
    {
        folder:"WonderLust",
        allowedFormat:["jpg","png","jpeg"],
    }

});

module.exports={cloudinary,storage};