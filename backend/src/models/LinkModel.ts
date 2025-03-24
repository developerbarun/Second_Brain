import mongoose, {Schema,model} from "mongoose";
const userModel = require("./userModel");

const ObjectId = mongoose.Types.ObjectId;

const contentTypes = ['image', 'video', 'article', 'audio'];

const linkSchema = new Schema({
    hash : String,
    userId : {type : ObjectId, ref : 'user', required : true, unique : true}
})

export const LinkModel = model("links",linkSchema);