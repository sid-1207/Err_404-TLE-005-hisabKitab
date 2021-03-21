var mongoose =require('mongoose');
var passportLocalMongoose=require('passport-local-mongoose');


var userSchema= new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    name: String,
    phone: { type: String, unique: true, required: true },
    password:String,
});



userSchema.plugin(passportLocalMongoose, {usernameUnique : false});
module.exports= mongoose.model('User',userSchema);