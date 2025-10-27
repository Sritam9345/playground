import express from "express";
import authUser from "./middleware/middleware";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common-backend/config";
import { UserSchema } from "@repo/common/types"


const app = express();





app.post("/signup",authUser, async (req,res)=>{


    const data = UserSchema.safeParse(req.body);

    if(!data.success){
        res.status(404).json({
            message:"Invalid inputs"
        })
        return 
    }

    //db call here

    const token = jwt.sign({
        userId: req.userId
    }, JWT_SECRET);


});

app.post("/signin",(req,res)=>{
    
});

app.get("/profile");


app.post("/create-room",authUser,(req,res)=>{

})




app.listen(4000);