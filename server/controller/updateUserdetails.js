const getUserDetailsFromToken = require("../helpers/getUserDetailsfromtoken");
const UserModel = require("../models/UserModel");

async function updateuserdetails(req,res){
    try {
        const {name,profilepic}=req.body;

        const token = req.cookies.token || ""

        const user = await getUserDetailsFromToken(token);

        const updateuser=await UserModel.updateOne({_id:user.id},{$set:{name:name,profilepic:profilepic}});
        const userwithupdateddetails=await UserModel.findOne(user._id);
        return res.status(200).json({
            message:"updated successfully",
            data:userwithupdateddetails,
            success:true
        })
    } catch (error) {
        res.status(500).json({
            message:error.message||error,
            error:true
        })
    }

    

}
module.exports=updateuserdetails;