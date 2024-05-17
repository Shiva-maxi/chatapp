const UserModel=require('../models/UserModel')
async function checkEmail(req,res){

    try {
        const {email}=req.body;

        const user=await  UserModel.findOne({email}).select("-password");
    
        if(!user){
            return res.status(400).json({
                message:"User not registered",
                error:true,
            })
        }
    
        return res.status(200).json({
            message:"email verified",
            data:user,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true 
        })
    }
   
}



module.exports=checkEmail;