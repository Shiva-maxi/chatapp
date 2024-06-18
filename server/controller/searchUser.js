const UserModel = require("../models/UserModel");
async function Searchuser(req,res){
    try {
        const { search } = req.body

        const query = new RegExp(search,"i","g")

        const user = await UserModel.find({
            "$or" : [
                { name : query },
                { email : query }
            ]
        }).select("-password")

        return res.json({
            data : user,
            success : true,
            message:"all user"
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}


module.exports=Searchuser;