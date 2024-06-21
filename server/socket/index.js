const express = require("express");
const { Server } = require("socket.io");
const app = express();

const http = require("http");

const server = http.createServer(app);

const getUserDetailsFromToken = require("../helpers/getUserDetailsfromtoken");
const UserModel = require("../models/UserModel");
const getConversation=require('../helpers/getConversation')
const {
  MessageModel,
  ConversationModel,
} = require("../models/ConversationModel");

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

const onlineusers = new Set();

io.on("connection", async (socket) => {
  console.log("connect User ", socket.id);

  const token = socket.handshake.auth.token;
  console.log("iehbs");
  //current user details
  const user = await getUserDetailsFromToken(token);

  //create a room
  socket.join(user?._id.toString());
  onlineusers.add(user?._id?.toString());

  io.emit("onlineuser", Array.from(onlineusers));

  socket.on("message-page", async (userId) => {
    console.log("userId", userId);
    const userDetails = await UserModel.findById(userId).select("-password");

    const payload = {
      _id: userDetails?._id,
      name: userDetails?.name,
      email: userDetails?.email,
      profile_pic: userDetails?.profilepic,
      online: onlineusers.has(userId),
    };
    socket.emit("message-user", payload);

    const getConversationMessage = await ConversationModel.findOne({
      $or: [
        { sender: user?._id, receiver: userId },
        { sender: userId, receiver: user?._id },
      ],
    })
      .populate("messages")
      .sort({ updatedAt: -1 });

      socket.emit('message',getConversationMessage?.messages || [])

  });
  //new message  from client to push to server

  socket.on("new message", async (data) => {
    const Conversation = await ConversationModel.findOne({
      $or: [
        { sender: data?.sender, receiver: data?.receiver },
        { sender: data?.receiver, receiver: data?.sender },
      ],
    });
    // if no Conversation create it
    if (!Conversation) {
      const createconversation = await ConversationModel({
        sender: data?.sender,
        receiver: data?.receiver,
      });

      const save = await createconversation.save();
    }

    const message = new MessageModel({
      text: data?.text,
      imageurl: data?.imageurl,
      videourl: data?.videourl,
      msgbyuserid: data?.msgbyuserid,
    });

    const savemessage = await message.save();

    const updateconversation = await ConversationModel.updateOne(
      { _id: Conversation?._id },
      {
        $push: { messages: savemessage?._id },
      }
    );
    const getConversationMessage = await ConversationModel.findOne({
      $or: [
        { sender: data?.sender, receiver: data?.receiver },
        { sender: data?.receiver, receiver: data?.sender },
      ],
    })
      .populate("messages")
      .sort({ updatedAt: -1 });

    io.to(data?.sender).emit("message", getConversationMessage?.messages || []);
    io.to(data?.receiver).emit(
      "message",
      getConversationMessage?.messages || []
    );
    const conversationSender = await getConversation(data?.sender)
    const conversationReceiver = await getConversation(data?.receiver)

    io.to(data?.sender).emit('conversation',conversationSender)
    io.to(data?.receiver).emit('conversation',conversationReceiver)
    console.log("new smessage", data);
  });

  socket.on('sidebar',async (data)=>{
    console.log('current user',data)


    const conversation=await getConversation(data)//data->>userid 
    socket.emit('conversation',conversation)
  })

  socket.on("disconnect", () => {
    onlineusers.delete(user?._id.toString());
    console.log("user diconnected", socket.id);
  });
});

module.exports = {
  app,
  server,
};
