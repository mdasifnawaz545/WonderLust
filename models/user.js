const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');

const userSchema=new mongoose.Schema({
    // By default Passport NPM Package will create the username and password with the hashing and salting.
    email:{
        type:String,
        required:true
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);