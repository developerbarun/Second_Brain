import mongoose, {model, Schema } from "mongoose";

const userSchema = new Schema({
    name : {type : String, require : true},
    username : {type : String, unique : true, require : true},
    password : {type : String , require : true},
});

export const UserModel = model("user",userSchema);

