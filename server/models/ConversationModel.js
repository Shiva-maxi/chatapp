const mongoose=require("mongoose");

const messageSchema=new mongoose.Schema({
    text:{
        type:String,
        default:"",
    },
    imageurl:{
        type:String,
        default:"",
    },
    videourl:{
        type:String,
        default:"",
    },
    seen:{
        type:Boolean,
        default:false,
    },
    msgbyuserid:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true
})
const conversationSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    receiver:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    messages:[

        {
            type:mongoose.Schema.ObjectId,
            ref:'Message'
        }
    ]

},{
    timestamps:true
})

const MessageModel=mongoose.model('Message', messageSchema);
const ConversationModel=mongoose.model('Conversation',conversationSchema);

module.exports= {MessageModel,ConversationModel};