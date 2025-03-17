import { Router } from "express";
const contentRoute = Router();
const { contentModel } = require("../models/contentModel");

contentRoute.post("/", async(req,res) => {
    const title = req.body.title;
    const link = req.body.link;
    const type = req.body.type;
    try{
    await contentModel.create({
        title,
        link,
        type,
        //@ts-ignore
        userId : req.userId,
        tags : []
    })

    res.json({
        message : "Content added"
    })}catch(e){
        res.json({
            errr : e 
        })
    }

})

contentRoute.get("/", async(req,res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await contentModel.find({userId}).populate("userId","username");
    res.json({
        content
    })
})


contentRoute.delete("/",async(req,res) => {
    const contenetId = req.body.contenetId;
    try{
    await contentModel.deleteMany({
        contenetId,
        //@ts-ignore
        userId : req.userId
    });

    res.json({
        message : "Deleted"
    })
    }catch(e){
        res.status(403).json({
            error : e
        })
    }
})

module.exports = {contentRoute};