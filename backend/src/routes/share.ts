import { Router,Request,Response } from "express";
import { LinkModel } from "../models/LinkModel";
import { random } from "./utils";
import { userMiddleware } from "../middleware/auth"; 
import { UserModel } from "../models/userModel";
import { contentModel } from "../models/contentModel";

const shareRoute = Router();


interface AuthRequest extends Request {
    userId?: string;
}

shareRoute.post("/share",userMiddleware,async(req : AuthRequest,res : Response) => {
    const share = req.body.share;
    if(share){
        const existingUser = await LinkModel.findOne({
            userId : req.userId
        });
        if(existingUser){
            res.json({
                hash : existingUser.hash
            })
            return;
        }
        const hashLink = random(10);
        await LinkModel.create({
            userId : req.userId,
            hash : hashLink
        })
        
        res.json({
            hash : hashLink
        })
    }else{
        await LinkModel.deleteOne({
            userId : req.userId
        })
        res.json({
            message : "Removed Link"  
         })
    }
})

shareRoute.get("/:shareLink",async(req,res) => {
    const hash = req.params.shareLink;
    const link = await LinkModel.findOne({
        hash : hash
    })

    if(!link){
        res.status(411).json({
            message : "Incorrect input"
        })
        return;
    }
    const content = await contentModel.find({
        userId : link.userId
    });

    const user = await UserModel.findOne({
        _id: link.userId
    })

    console.log(link);
    

    if(!user){
        res.status(411).json({
            message : "User not found"
        })
        return;
    }

    res.json({
        username : user.username,
        content : content
    })

})


module.exports = { shareRoute }