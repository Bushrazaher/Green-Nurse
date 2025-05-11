import mongoose from "mongoose";

const UserSchema=mongoose.Schema({
    fname:{type:String,required:true,},
    lname:{type:String,required:true,},
    email:{type:String,required:true,unique:true,},
    password:{type:String,required:true,}

});

const UserModels =mongoose.model("userInfos",UserSchema);
export default UserModels;