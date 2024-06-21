const {ConversationModel}=require('../models/ConversationModel');
 


const getConversation=async(userid)=>{

    if(userid){
        const currrentuserconversation=await ConversationModel.find({
            '$or':[{sender:userid},{receiver:userid}]
        }).sort({updatedAt:-1}).populate('messages').populate('sender').populate('receiver');
    
    
        const conversation=currrentuserconversation.map((conv,ind)=>{
            const countunseenmessage=conv.messages.reduce((prev,curr)=>{
                return prev+(conv.seen)?0:1;
            },0);
    
            return{
                _id : conv?._id,
                sender : conv?.sender,
                receiver : conv?.receiver,
                unseenMsg : countunseenmessage,
                lastMsg : conv.messages[conv?.messages?.length - 1]
            }
        })

        return conversation
    }

    return [];
    
    

}


module.exports=getConversation;