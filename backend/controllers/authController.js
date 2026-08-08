const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      role: "user",
      balance: 10000,
    });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
        balance: user.balance,
        accountNumber: user.accountNumber,
        ifsc: user.ifsc,
        branchName: user.branchName,
        accountType: user.accountType,
        accountStatus: user.status,
        accountOpenDate: user.accountOpenDate,
        aadhaarNumber: user.aadhaarNumber,
        panNumber: user.panNumber,
        kycStatus: user.kycStatus,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );


    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );


    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      success: true,
      message: "Login Successful",
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
        balance: user.balance,
        accountNumber: user.accountNumber,
        ifsc: user.ifsc,
        branchName: user.branchName,
        accountType: user.accountType,
        accountStatus: user.status,
        accountOpenDate: user.accountOpenDate,
        aadhaarNumber: user.aadhaarNumber,
        panNumber: user.panNumber,
        kycStatus: user.kycStatus,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// ================= FORGOT PASSWORD =================

exports.forgotPassword = async (req,res)=>{
try{

const {username}=req.body;

const user=await User.findOne({username});

if(!user){
return res.status(404).json({
success:false,
message:"User not found"
});
}

const otp=Math.floor(100000 + Math.random()*900000).toString();

user.resetOTP=otp;
user.resetOTPExpiry=Date.now()+5*60*1000;

await user.save();

await sendEmail(
user.email,
"NovaPay Password Reset OTP",
`Your OTP is ${otp}. It is valid for 5 minutes.`
);

res.json({
success:true,
message:"OTP sent to registered email"
});

}catch(err){
res.status(500).json({
success:false,
message:err.message
});
}
};


// ================= VERIFY OTP =================

exports.verifyOTP = async(req,res)=>{
try{

const {username,otp}=req.body;

const user=await User.findOne({username});

if(!user){
return res.status(404).json({
success:false,
message:"User not found"
});
}

if(user.resetOTP!==otp || user.resetOTPExpiry<Date.now()){

return res.status(400).json({
success:false,
message:"Invalid or Expired OTP"
});

}

res.json({
success:true,
message:"OTP Verified"
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}
};


// ================= RESET PASSWORD =================

exports.resetPassword = async(req,res)=>{
try{

const {username,newPassword}=req.body;

if(!username || !newPassword){
return res.status(400).json({
success:false,
message:"Username and new password are required"
});
}

if(newPassword.length < 8){
return res.status(400).json({
success:false,
message:"Password must be at least 8 characters"
});
}

const user=await User.findOne({username});

if(!user){
return res.status(404).json({
success:false,
message:"User not found"
});
}

// OTP must have been verified and must still be within its validity window
if(!user.resetOTP || !user.resetOTPExpiry || user.resetOTPExpiry < Date.now()){
return res.status(400).json({
success:false,
message:"Please verify the OTP first"
});
}

const bcrypt=require("bcryptjs");

user.password=await bcrypt.hash(newPassword,10);

// OTP becomes unusable after password reset
user.resetOTP="";
user.resetOTPExpiry=null;

await user.save();

res.json({
success:true,
message:"Password Updated Successfully"
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}
};


// ================= REFRESH TOKEN =================



exports.refreshToken = async (req,res)=>{

try{

const {refreshToken}=req.body;


if(!refreshToken){

return res.status(401).json({
success:false,
message:"Refresh Token Required"
});

}


const user = await User.findOne({
refreshToken
});


if(!user){

return res.status(403).json({
success:false,
message:"Invalid Refresh Token"
});

}


jwt.verify(
refreshToken,
process.env.JWT_SECRET,
(err)=>{

if(err){

return res.status(403).json({
success:false,
message:"Expired Refresh Token"
});

}

});


const newAccessToken = jwt.sign(
{
id:user._id,
username:user.username,
role:user.role
},
process.env.JWT_SECRET,
{
expiresIn:"15m"
});


res.json({
success:true,
token:newAccessToken
});


}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

};



// ================= LOGOUT =================

exports.logout = async (req,res)=>{

try{

const {refreshToken}=req.body;


if(!refreshToken){

return res.status(400).json({
success:false,
message:"Refresh Token Required"
});

}


const user = await User.findOne({
refreshToken
});


if(!user){

return res.status(404).json({
success:false,
message:"User not found"
});

}


user.refreshToken="";

await user.save();


res.json({
success:true,
message:"Logout Successful"
});


}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

};

