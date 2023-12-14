const Profile = require("../models/Profile");
const {passwordUpdated } = require("../mail/templates/passwordUpdate");
const mailSender = require("../utils/mailSender");
const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//signup
exports.signUp =  async (req, res) => {
    try {
        
    //data fetch from request ki body
    const {
        firstName,
        lastName,
        email,
        password,
        confirmpassword,
        accountType,
        contactNumber,
        otp
    } = req.body;
    //validate karlo
    if(!firstName || !lastName || !email || !password || 
        !confirmpassword || !otp) {
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            })
        }
    //2 password match karlo 
    if(password !== confirmpassword) {
        return res.status(400).json({
            success:false,
            message:'password and ConfirmPassword Value does not match ,please try again'
        });
    }
    //check user alreduy exist or not 
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:'User is already registered',
        });
    }
    
    //find most resent otp stored for the user 
    const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
    console.log(recentOtp);
    //validate OTP
    if(recentOtp.length == 0) {
        //otp not found
        return res.status(400).json({
            success:false,
            message:'OTPP Found',
        })
    }else if(otp !== recentOtp.otp) {
        //Invalid OTP
        return res.status(400).json({
            success:false,
            message:"Invalid OTP",

        });
       
    }

    //Hash password 
    const hashedPassword = await bcrypt.hash(password, 10);

    //centry create in DB

    const ProfileDetails = await Profile.create({
        gender:null,
        dateOfBirth: null,
        about:null,
        contactNumber:null,
    });

    
    const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password:hashedPassword,
        accountType,
        additionalDetails:ProfileDetails._id,
        Image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
    })

    //return res
    return res.status(200).json({
        success:true,
        message:'User id registered Successfully',
        user,
    })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered.Please try again",
        })

    }

}

//Login 
exports.login = async (req, res) => {
    try {
        //get data from req body
        const {email, password} = req.body;
        // validation data
        if(!email || !password) {
            return res.status(403). json({
                success:false,
                message:'All fields are required,please try again',
            });
        }
        //user check exist or not
        const user = await User.findOne({email}).populate("addtionalDetails");
        if(!user) {
            return res.status(401).json ({
                success:false,
                message:"User is not registered , p;ease signup first",
            });
        }
        //generate jWT , after password matching
        if (await bcrypt.compare(password, user.password)) {
            const payload ={
                email: user.email,
                id: user._id,
                accountType:user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"2h",
            });
            user.token = token;
            user.password= undefined;

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'Logged in successfully',
            })
        } 
        else {
            return res.status(401).json({
                success:false,
                message:'Password is incorrect',
            });
        }
        
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure ,please try again',
        })

    }
};

//changePassword
//TODO :Homework
exports.changepassword = async ( req, res) => {
    //get data from req body
    //get old password ,new password ,confirm password
    //validation

    //update pwd in DB
    //send mail-password updated
    //return response
}
/*//send OTP
exports.sendOTP = async (req, res) => {

    try {
          //fetch email from request ki body
    const {email} = req.body;

    //check if user already exist 
    const checkUserPresent = await User.findOne({email});

    ///if user already exist , then return a response 
    if (checkUserPresent) {
        return res.status(401).json({
            success:false,
            message:'User already registered',
        })
    }

    //generate otp
    var otp = otpGenerator.generate(6, {
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    });
    console.log("OTP generated ", otp );

    //check unique otp or not
    let result = await OTP.findOne({otp: otp});

    while(result) {
        otp = otpGenerator(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,

        });
        result =  await OTP.findOne({otp: otp});

    }

    const otpPayload = {emial, otp};

    //create an entry in otp
    const otpBody = await OTP.create(otpPayLoad);
    console.log(otpBody);

    //return response successful
    res.status(200).json({
        success:true,
        message:'OTP Sent Successfully',
        otp,
    })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })

    }
  

};
*/
