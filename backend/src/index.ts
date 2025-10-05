import express from "express";
import mongoose from "mongoose";
const { userMiddleware } = require("./middleware/auth");
const { contentRoute } = require("./routes/content");
const { shareRoute } = require("./routes/share");
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();
const app = express();
const { userRoute } = require("./routes/user");


// app.use(cors())

app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      "https://second-brain-oajy-j8knqt3sa.vercel.app/", // your deployed frontend (adjust name if different)
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


app.use(express.json());

app.get("/",(req,res) => {
    res.send("Hello");
})


app.use("/api/v1/user",userRoute);
app.use("/api/v1/content", contentRoute);
app.use("/api/v1/brain",shareRoute);



async function call(){
    await mongoose.connect(process.env.MONGODB_URI as string);
    app.listen(process.env.PORT, () => {
        console.log(`Connected ${process.env.PORT}`);
        
    })
} 

call();


