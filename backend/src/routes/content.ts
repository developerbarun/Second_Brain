import { Router,Response,Request } from "express";
const contentRoute = Router();
const { contentModel } = require("../models/contentModel");

interface AuthRequest extends Request{
    userId ?: string;
} 

contentRoute.post("/", async(req : AuthRequest,res : Response) => {
    const title = req.body.title;
    const link = req.body.link;
    const type = req.body.type;
    try{
    await contentModel.create({
        title,
        link,
        type,
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

contentRoute.get("/", async(req:AuthRequest,res : Response) => {
    const userId = req.userId;
    const content = await contentModel.find({userId}).populate("userId","username");
    res.json({
        content
    })
})


contentRoute.delete("/",async(req:AuthRequest,res : Response) => {
    const contenetId = req.body.contenetId;
    try{
    await contentModel.deleteMany({
        contenetId,
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