import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "@repo/common-backend/config"



export default function authUser(req :Request ,res : Response, next: NextFunction){

   const token = req.headers["authorization"] ?? "";

   const decode = <{userId:string}> jwt.verify(token,JWT_SECRET);

   if(decode){
    req.userId = decode.userId;
    next();
   }else{
res.json({
    error:"Unauthorized access."
})
   }
   

}