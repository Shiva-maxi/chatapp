const getUserDetailsfromtoken = require("../helpers/getUserDetailsfromtoken")
const jwt=require('jsonwebtoken');
// async function userDetails(req,res){
//     try{
//         const token=req.cookies.token || "";

//         const user=await getUserDetailsfromtoken(token);

//         return res.status(200).json({
//             message:"userdetails",
//             data:user,
//             token:token,

//         })
//     }

//     catch(error){
//         return res.status(500).json({
//             message:error.message|| error,
//             error:true,
//         })
//     }
    
// }

// module.exports=userDetails;
 

async function userDetails(req,res){
    try {
        const token = req.cookies.token || ""

        const user = await getUserDetailsfromtoken(token)

        return res.status(200).json({
            message : "user details",
            data : user
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = userDetails