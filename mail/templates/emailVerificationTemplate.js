exports.otpTemplate = (otp)=> {
    return `<!DOCTYPE html>
   <html>
   
   <head>
       <meta charset="UTF-8">
       <title>OTP verioficaiton Email</title>
       <style>
           body {
               background-colorl: #ffffff;
               font-family: Arial, sans-sarif;
               font-size: 16px;
               line-height: 1.4;
               color: #333333;
               margin: 0;
               padding: 0;

           }

           .container {
               max-width: 600px;
               margin: 0 auto;
               padding: 20px;
               text-align: center;
           }

           .logo{
               max-width: 200px;
               margin-bottom: 20px; 
           }

           .message {
               font-size: 18px;
               font-weight: bold;
               margin:-bottom: 20px;

           }

           .body{
               font-size: 16px;
               margin-bottom: 20px;
           }

           .cta {
               display: inline-block;
               padding: 10px 20px;
               background-color: #FFD60A;
               color: #000000;
               text-decoration: none;
               border-radius: 5px;
               font-size: 16px;
               font-weight: bold;
               margin-top: 20px;

           }

           .support {
               font-size: 14px;
               color: #999999;
               margin-top: 20px;
           }

           .highlight{
               font-weight: bold;
           }
       </style>

   </head>

   <body>
      <div class="container">
      <a href ="https://studynotion-edtech-project.vercel.app"><img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png"
               alt="StudyNotion Logo"></alt>
      <div class="message">OTP Verification Email</div>
      <div class="body">
          <p>Dear User,</p>
          <p>Thank You for registering with studyNotion, To complete your registration ,please use the following otp
             (ont-Time Password) to verify your account:</p>
             <h2 class="highliight>${otp}</h2>
             <p>This OTP is valid for 5 minutes .If you did not requrest this verification ,please disregard to Once your 
                account is verified ,you will hace access to our platform and its feature.</p>
       </div>
       <div class="support">If you have any questions or need assistance ,please feel free to react out to 
               href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!</div>
   </div>
<body>

</html>`;
};
module.exports = otpTemplate;