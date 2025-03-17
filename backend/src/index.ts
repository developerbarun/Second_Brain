import express from "express";
import mongoose from "mongoose";
const { userMiddleware } = require("./middleware/auth");
const { contentRoute } = require("./routes/content");
const { shareRoute } = require("./routes/share");

import dotenv from "dotenv";
dotenv.config();


const app = express();
const { userRoute } = require("./routes/user");


app.use(express.json());

app.use("/api/v1/user",userRoute);
app.use("/api/v1/content", userMiddleware, contentRoute);
app.use("/api/v1/brain",shareRoute);

async function call(){
    await mongoose.connect(process.env.MONGODB_URI as string);
    app.listen(3000, () => {
        console.log("Connected");
        
    })
} 

call();


