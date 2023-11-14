// Inserting Sample Data into Database

const mongoose=require('mongoose');
const sample_data=require('./sample.js');
const Listing=require('../models/schema.js');
let Mongo_Url = "mongodb://127.0.0.1:27017/WonderLust";

main().then(() => {
    console.log("Connected With DataBase");
}).catch((err) => {
    console.log("Not Connected With DataBase");
});
async function main() {
    await mongoose.connect(Mongo_Url);
};

const initDB= async()=>{
    await Listing.deleteMany({});
    sample_data.data=sample_data.data.map((obj)=>({...obj,owner:"654ce84134b8b25500c797d0"}));
    await Listing.insertMany(sample_data.data);
    console.log("Sample Data are Saved");
}

initDB();