const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        reuired : true
    },
    email : {
        type :String,
        required : true,
        unique : true
    },
    password : {
        type : String ,
        required : true
    },
    avatar : {
        type : String,
        default : 'avatar.png'
    }
});

module.exports = mongoose.model("User", UserSchema);
