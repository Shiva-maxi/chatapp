// const UserModel = require("../models/UserModel");
// const bcryptjs = require("bcryptjs");
// const jwt=require('jsonwebtoken');
// async function checkPassword(req, res) {
//   try {
//     const { password, user_id } = req.body;

//     const user = await UserModel.findById( user_id );

//     const verifypass = await bcryptjs.compare(password, user.password);

//     if (!verifypass) {
//       return res.status(400).json({
//         message: "Please check your password",
//         error: true,
//       });
//     }

//     const tokendata={
//         id:user._id,
//         email:user.email,
//     }
//     const token=jwt.sign(tokendata, process.env.JWT_SECREAT_KEY, { expiresIn: '1d' });
//     return res.cookie('token',token,{
//         http:true,
//         secure:true

//     }).status(200).json({
//       message: "Login Successfully",
//       token:token,
//       success: true,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       error: true,
//     });
//   }
// }

// module.exports = checkPassword;
const UserModel = require("../models/UserModel")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function checkPassword(request,response){
    try {
        const { password, user_id} = request.body

        const user = await UserModel.findById(user_id)

        const verifyPassword = await bcryptjs.compare(password,user.password)

        if(!verifyPassword){
            return response.status(400).json({
                message : "Please check password",
                error : true
            })
        }

        const tokenData = {
            id : user._id,
            email : user.email 
        }
        const token = await jwt.sign(tokenData,process.env.JWT_SECREAT_KEY,{ expiresIn : '1d'})

        const cookieOptions = {
            http : true,
            
        }

        return response.cookie('token',token,cookieOptions).status(200).json({
            message : "Login successfully",
            token : token,
            success :true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = checkPassword