import express from "express";
import authUser from "./middleware/middleware";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common-backend/config";
import { UserSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client"


const app = express();





app.post("/signup",authUser, async (req,res)=>{


    const data = <{
        username:string,
        email:string,
        password:string
    }> UserSchema.safeParse(req.body).data;

    if(!data){
        res.status(404).json({
            message:"Invalid inputs"
        })
        return 
    }

    //db call here
try{
  const userData = await prismaClient.user.create({
        data:{
            name: data.username,
            email: data.email,
            password: data.password
        }
    })

     const token = jwt.sign({
        userId: userData.id
    }, JWT_SECRET);

}catch(error){
    res.status(400).json({
        message:error
    })
}
   

});

app.post("/signin",(req,res)=>{
    
});

app.get("/profile");


app.post("/create-room",authUser,(req,res)=>{

})




app.listen(4000);