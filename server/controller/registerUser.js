const UserModel=require('../models/UserModel');
const bcryptjs=require("bcryptjs");
async function registerUser(req,res){
    try {
        
        const {name,email,password,profilepic}=req.body;

        const isuserpresent=await UserModel.findOne({email});

        if(isuserpresent){
            return res.status(400).json({
                message:"User already exists",
                error:true,
            })
        }

        const salt=await bcryptjs.genSalt(10);
        const hashpassword=await bcryptjs.hash(password,salt);
        
        const newuser=new UserModel({
            name:name,
            email:email,
            password:hashpassword,
            profilepic:profilepic
        })

        const usersave=await newuser.save();

        return res.status(201).json({
            message:"User registered Successfully",
            data:usersave,
            success:true
        })

    } catch (error) {
        return res.status(500).json({
            error:error.message || error,
            error:true
        })
        
    }
}


module.exports=registerUser