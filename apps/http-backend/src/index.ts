import express from "express";
import authUser from "./middleware/middleware";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common-backend/config";
import { UserSchema , SigninSchema, RoomSchema} from "@repo/common/types"
 import { prismaClient } from "@repo/db/client"
 import {hashPassword , comparePassword} from "@repo/common/hash"


const app = express();

app.use(express.json());

app.post("/signup", async (req,res)=>{



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

    const hashedPassword = await hashPassword(data.password);

  const userData = await prismaClient.user.create({
        data:{
            name: data.username,
            email: data.email,
            password: hashedPassword
        }
    })

     const token = jwt.sign({
        userId: userData.id
    }, JWT_SECRET);

    return res.json({
        userData
    })

}catch(error){
    res.status(400).json({
        message:error
    })
}
   

});

app.post("/signin", async (req,res)=>{
    
     const data = <{
        email:string,
        password:string
    }> SigninSchema.safeParse(req.body).data;

    try{

        const userData = await prismaClient.user.findUnique({
            where:{
                email:data.email
            }
        });

        if(!userData){
            res.json({
                message:"User Doesn't exists"
            })
            return
        }

        const isMatch = await comparePassword(data.password,userData.password);

        if(!isMatch){
            res.json({
                message:"Invalid Password"
            })
            return
        }

  const token = jwt.sign({
        userId: userData.id
    }, JWT_SECRET);

        res.json({
            token:token
        })


    }catch(error){
        console.log(error);
res.status(500).json({
message:"Unable to connect to DB"
})
    }

});

app.get("/profile",authUser,async (req,res)=>{

  try{
    const userData = await prismaClient.user.findFirst({
        where:{
            id:req.userId
        }
    })

    res.json({
        userData
    })

}
    catch(e){
        res.status(500).json({
            message:"Unbale to connect to the server"
        })
    }

});


app.post("/create-room",authUser, async (req,res)=>{

     const data = <{
       name:string
    }> RoomSchema.safeParse(req.body).data;

    const room = await prismaClient.room.create({
        data:{
            slug:data.name,
            adminId: req.userId
        }
    })

    res.json({
        roomId:room.id
    })


})


app.get("/chats/:roomId", async (req, res) => {
    try {
        const roomId = Number(req.params.roomId);
        console.log(req.params.roomId);
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
         
        });

        res.json({
            messages
        })
    } catch(e) {
        console.log(e);
        res.json({
            messages: []
        })
    }
    
})

app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug
        }
    });

    res.json({
        room
    })
})


app.listen(4000);