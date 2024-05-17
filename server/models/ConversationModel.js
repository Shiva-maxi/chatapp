const mongoose=require("mongoose");

const messageSchema=new mongoose.schema({
    text:{
        type:String,
        default:"",
    },
    photourl:{
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