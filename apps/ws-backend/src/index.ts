import { WebSocketServer , WebSocket} from "ws"
import jwt from "jsonwebtoken"
import {JWT_SECRET} from "@repo/common-backend/config"
import {prismaClient} from "@repo/db/client"

const wss = new WebSocketServer({port:8080});


interface User {
    ws: WebSocket,
    rooms:string[],
    userId: string
}

const user : User[] = [];



function checkUser(token: string): string | null{

 try{   const isMatch = <{userId:string}> jwt.verify(token,JWT_SECRET);


    if(isMatch) return isMatch.userId;

    else return null;

    }

    catch(error){
return null;
    }
 }

wss.on("connection",(ws,request)=>{

   const url = request.url;

   if(!url){
    ws.close();
    return ;
   }
   
   const query = new URLSearchParams(url.split('?')[1]);
   const token = query.get('token') ?? "";
   const userId = checkUser(token);

   if(userId == null){
    ws.close();
    return null;
   }

   user.push({
    userId:userId,
    rooms: [],
    ws:ws
   })



    ws.on('message', async (data : string)=>{
        
        const parsedData = JSON.parse(data);

        if(parsedData.type == "join_room"){
            const reqUser = user.find(x => x.ws==ws);
            reqUser?.rooms.push(parsedData.roomId);

        }
        if(parsedData.type == "leave_room"){
            const reqUser = user.find(x => x.ws==ws);

            if(!reqUser){ 
                return }
            reqUser.rooms = reqUser?.rooms.filter(x => x!==parsedData.roomId);

        }

        if(parsedData.type == "send"){


          await  prismaClient.chat.create({
                data:{
                   roomId:parsedData.roomId,
                   message:parsedData.message,
                   userId:parsedData.userId
                }
            })

        user.forEach(user =>{
            if(user.rooms.includes(parsedData.roomId)){
                user.ws.send(JSON.stringify({
                    type: "chat",
                    message: parsedData.message,
                    roomId:parsedData.roomId
                }))
            }
        })

            
        }
    })


});

