const express=require("express");
const registerUser = require("../controller/registerUser");
const checkEmail = require("../controller/checkEmail");
const checkPassword = require("../controller/checkPassword");
const userDetails = require("../controller/userDetails");
const logout = require("../controller/logout");
const updateuserdetails = require("../controller/updateUserdetails");
const router=express.Router();
// api for registering a user
router.post('/register',registerUser);
// api for checking email of a user 
router.post('/email',checkEmail);
// api for checking password
router.post('/password',checkPassword);
//api for getting user details
router.get('/userdetails',userDetails)
//api for logout
router.get('/logout',logout)

router.post('/updateuserdetails',updateuserdetails)
module.exports=router;