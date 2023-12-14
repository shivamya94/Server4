 
 const { response } = require("express");
 const User = require("../models/User");
 const mailSender = require("../utils/mailSender");
 const bcrypt = require("bcrypt");

 //resestPaswordToken
 exports.resetPassswordToken = async (req, res) => {
   try{
     //get email from req body
     const email = req.body.email;
     //check user for this email, email validation
     const user =  await User.findOne({email: email}); 
     if(!user) {
         return res.json({success:false,
         message:`This Email: ${email} is not Registered with Us Enter a Valid Email`,});
     }
     //generate token
     const token = crypto.randomBytes(20).toString("hex");
     //update user by adding token and expiration time
     const updateDetails = await User.findOneAndUpdate(
                                     {email:email},
                                     {
                                         token:token,
                                         resetPasswordExpires: Date.now() + 3600000,
                                     },
                                     {new:true});
     console.log("DETAILS", updateDetails);
     //create url
     const url = `http://localhost:300/update-password/${token}`
     //send mail containing the url
     await mailSender(email,
                      "Password Reset Link",
                      `Your Link for email verification is ${url}. Please click this url to reset your password .`
        );
     //return response
         res.json({
         success:true,
         message:'Email sent Successfully ,please check Your Email to Continue Further',
 
     });
   }
   catch(error) {
    return res.status(500).json({
        success:false,
        message:'Some Error in Sending the Reset Message',
    });
   }
  
 };


 //resentPassword 

 exports.resetPasssword = async (req, res) => {
   try{
     //fetch the data
     const {password,confirmpassword,token} = req.body;
     //validation
     if(password !== confirmpassword) {
         return res.json({
             success:false,
             message:"Password and Confirm Password Does not Match",
         })
     }
     //get userDetails from db using token
     const userDetails = await User.findOne({token: token});
     //if no entry - invalid token
     if(!userDetails) {
         return res.json({
             success:false,
             message:'Token is invalid',
         })
     }
     //token time check
     if(!(userDetails.resetPasswordExpires > Date.now())) {
         return res.status(403).json({
             success:false,
             message:'Token is expired, Please Regenerate Your Token',
         });
 
     }
     //hash password
     const encryptedPassword = await bcrypt.hash(password, 10);
     //password update
     await User.findOneAndUpdate(
         {token:token},
         {password:hashedPassword},
         {new:true},
     );
     //return response
      res.json({
         success:true,
         message:'Password Reset Successful',
     });
   }
   catch(error) {
    return res.json({
        error: error.message,
        success:false,
        message:'Some Error in Updating the Password',
    });
   }
};