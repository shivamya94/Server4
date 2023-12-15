const express = require("express")
const router = express.Router()

const {
  login,
  signup,
  sendotp,
  changepassword,
} = require("../controllers/Auth")
const { 
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword")

console.log(sendotp);
// const { auth } = require("../middlewares/auth")

// //Routes for Login ,signup and Authentication

// //**************************************************************************************************************** */
// //                            Authenticaiton routes
// //*************************************************************************************************************** */

// //Routes for user login
// router.post("/login", login)

// //Route for user login
// router.post("/signup", signup)

// //Route for sending OTP to the user's email
// router.post("/sendotp", sendotp)

// //Route for changing the password
// router.post("/changepassword", auth, changepassword)
// //************************************************************************************************************** */
// //                                      Reset Password
// //*************************************************************************************************************** */

// //Route for generating a reset password tokem
// router.post("/reset-password-token", resetPasswordToken)

// //Route for resetting user's password after Verification
// router.post("/reset-password", resetPassword)

// //Export the router for use in the main application
// module.exports = router
