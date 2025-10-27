import { WebSocketServer } from "ws"
import jwt from "jsonwebtoken"
import {JWT_SECRET} from "@repo/common-backend/config"

const wss = new WebSocketServer({port:8080});

wss.on("connection",(ws,request)=>{

   const url = request.url;

   if(!url){
    ws.close();
    return ;
   }
   
   const query = new URLSearchParams(url.split('?')[1]);
   const token = query.get('token') ?? "";
   const decoded = jwt.verify(token,JWT_SECRET);

   if(!decoded){
    ws.close();
    return 
   }

    ws.on('message',(data)=>{
        ws.send('pong');
    })


});

