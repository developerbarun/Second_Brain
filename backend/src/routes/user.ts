import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { UserModel } from "../models/userModel"

const userRoute = Router();

userRoute.post("/signup", async(req,res) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    try{
    const user = await UserModel.create({
        name, username,password
    });

    res.json({
        message : "User successufully signedup"
    });
    }catch(e){
        res.status(411).json({
            error : e
        })
    }
})


userRoute.post("/signin", async(req,res) => {
    const username =  req.body.username;
    const password = req.body.password;
    const user = await UserModel.findOne({username,password});
    if(user){
        const token = jwt.sign({id : user._id},process.env.JWT_SECREAT as string);

        res.json({
            token : token
        })
    }else{
        res.status(403).json({
            message : "Incorrect Crediits"
        })
    }
})
module.exports  = {userRoute};