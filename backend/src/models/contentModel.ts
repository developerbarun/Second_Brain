import mongoose, {Schema,model} from "mongoose";
const userModel = require("./userModel");

const ObjectId = mongoose.Types.ObjectId;

const contentTypes = ['image', 'video', 'article', 'audio'];

const contentSchema = new Schema({
    title : String,
    link : String,
    type : { type: String, enum: contentTypes, required: true },
    tags : [{type : ObjectId, ref : 'Tag'}],
    userId : {type : ObjectId, ref : 'user'}
})

export const contentModel = model("content",contentSchema);