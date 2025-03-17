import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECREAT } from "../config";


export const userMiddleware = (req : Request,res : Response,next : NextFunction) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string,JWT_SECREAT);
    if(decoded){
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }else{
        res.json(403).json({
            message : "You are not logged in"
        })
    }
}