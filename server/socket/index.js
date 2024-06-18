const express = require("express");
const { Server } = require("socket.io");
const app = express();

const http = require("http");

const server = http.createServer(app);

const getUserDetailsFromToken =require("../helpers/getUserDetailsfromtoken");

const io =new  Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

const onlineusers=new Set();

io.on('connection',async (socket)=>{
    console.log('a user connected',socket.id)
    const token=socket.handshake.auth.token;//gets the token from frontend after making connection
    const user=await getUserDetailsFromToken(token);

    socket.join(user?._id);//the client joins a room named after its id

    onlineusers.add(user?._id);//adds the user to online users list;

    io.emit('onlineuser',Array.from(onlineusers));//emits the online users to all clients
    socket.on('disconnect',()=>{
        onlineusers.delete(user?._id)
        console.log('user diconnected',socket.id);
    })
})


module.exports={
    app,server
}