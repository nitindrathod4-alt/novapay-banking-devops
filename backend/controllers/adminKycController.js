const User = require("../models/User");


// GET PENDING KYC USERS

exports.getPendingKyc = async (req, res) => {
  try {

    const users = await User.find({
      kycStatus: "Pending",
      aadhaarNumber: { $ne: "" },
      panNumber: { $ne: "" }
    }).select(
      "-password"
    );

    res.json({
      success: true,
      count: users.length,
      users
    });

  } catch (err) {

    res.status(500).json({
      success:false,
      message: err.message
    });

  }
};


// APPROVE KYC

exports.approveKyc = async (req,res)=>{
  try {

    const user = await User.findById(req.params.id);

    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found"
      });
    }


    user.kycStatus = "Verified";

    await user.save();


    res.json({
      success:true,
      message:"KYC Approved",
      user:{
        id:user._id,
        username:user.username,
        kycStatus:user.kycStatus
      }
    });


  } catch(err){

    res.status(500).json({
      success:false,
      message:err.message
    });

  }
};


// REJECT KYC

exports.rejectKyc = async(req,res)=>{
  try{

    const user = await User.findById(req.params.id);


    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found"
      });
    }


    user.kycStatus="Rejected";

    await user.save();


    res.json({
      success:true,
      message:"KYC Rejected",
      user:{
        id:user._id,
        username:user.username,
        kycStatus:user.kycStatus
      }
    });


  }catch(err){

    res.status(500).json({
      success:false,
      message:err.message
    });

  }
};
