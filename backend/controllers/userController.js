
const bcrypt = require("bcryptjs");
// ================= CREATE USER =================

exports.createUser = async (req, res) => {
  try {

    const { name, username, password, balance } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        success:false,
        message:"Username already exists"
      });
    }

    const user = await User.create({
      name,
      username,
      password: await bcrypt.hash(password, 10),
      balance: Number(balance) || 10000
    });

    res.json({
      success:true,
      message:"User Created Successfully",
      user:{
        id:user._id,
        name:user.name,
        username:user.username,
        accountNumber:user.accountNumber,
        balance:user.balance,
        status:user.status
      }
    });

  } catch(err) {

    res.status(500).json({
      success:false,
      message:err.message
    });

  }
};

const User = require("../models/User");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");

    res.json({
      success: true,
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (user.role === "admin") {
      return res.status(400).json({
        success: false,
        message: "Admin cannot be deleted",
      });
    }

    await User.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "User Deleted Successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.depositUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    user.balance += Number(amount);

    await user.save();

    res.json({
      success: true,
      message: "Deposit Successful",
      balance: user.balance,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.withdrawUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (user.balance < Number(amount)) {
      return res.status(400).json({
        success: false,
        message: "Insufficient Balance",
      });
    }

    user.balance -= Number(amount);

    await user.save();

    res.json({
      success: true,
      message: "Withdraw Successful",
      balance: user.balance,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const Transaction = require("../models/Transaction");

exports.analytics = async (req, res) => {
  try {

    const users = await User.find();

    const totalUsers = users.length;

    const adminUsers = users.filter(
      u => u.role === "admin"
    ).length;

    const totalBalance = users.reduce(
      (sum, u) => sum + u.balance,
      0
    );

    const totalTransactions =
      await Transaction.countDocuments();

    res.json({
      success: true,
      totalUsers,
      adminUsers,
      totalBalance,
      totalTransactions,
    });

  } catch (err) {

    res.status(500).json({
      success:false,
      message:err.message
    });

  }
};


exports.uploadPhoto = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a photo",
      });
    }

    user.photo = "/uploads/" + req.file.filename;

    await user.save();

    res.json({
      success: true,
      message: "Profile photo uploaded successfully",
      photo: user.photo,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};


// ================= UPDATE USER =================

exports.updateUser = async (req, res) => {
  try {
    const { name, username, balance, status, mobileNumber, email } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name !== undefined) user.name = name;
    if (username !== undefined) user.username = username;
    if (balance !== undefined) user.balance = Number(balance);
    if (status !== undefined) user.status = status;
    if (mobileNumber !== undefined) user.mobileNumber = mobileNumber;
    if (email !== undefined) user.email = email;

    await user.save();

    res.json({
      success: true,
      message: "User updated successfully",
      user,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// ================= BLOCK / UNBLOCK USER =================

exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(400).json({
        success: false,
        message: "Admin cannot be blocked",
      });
    }

    user.status =
      user.status === "Active"
        ? "Blocked"
        : "Active";

    await user.save();

    res.json({
      success: true,
      message: `User is now ${user.status}`,
      user,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



// ================= GET USER PROFILE =================

exports.getUserProfile = async (req,res)=>{
  try {

    const user = await User.findById(req.params.id)
      .select("-password");

    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found"
      });
    }

    res.json({
      success:true,
      user
    });

  } catch(err){

    res.status(500).json({
      success:false,
      message:err.message
    });

  }
};


// ================= RESET PASSWORD =================


exports.resetPassword = async (req,res)=>{
  try {

    const { password } = req.body;

    const user = await User.findById(req.params.id);

    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found"
      });
    }


    user.password = await bcrypt.hash(password,10);

    await user.save();


    res.json({
      success:true,
      message:"Password Reset Successfully"
    });


  } catch(err){

    res.status(500).json({
      success:false,
      message:err.message
    });

  }
};


exports.changePassword = async (req,res)=>{

try{

const bcrypt = require("bcryptjs");
const User = require("../models/User");


const user = await User.findById(req.user.id);

if(!user){
return res.status(404).json({
message:"User not found"
});
}


const {oldPassword,newPassword}=req.body;


const match = await bcrypt.compare(
oldPassword,
user.password
);


if(!match){
return res.status(400).json({
message:"Old password incorrect"
});
}


user.password = await bcrypt.hash(newPassword,10);

await user.save();


res.json({
success:true,
message:"Password changed successfully"
});


}catch(err){

console.log("GET NOTIFICATION ERROR:", err);

res.status(500).json({
message:err.message
});

}

};


// ================= NOTIFICATION SETTINGS =================

exports.getNotificationSettings = async (req,res)=>{

try{


return res.json({
settings:{
transactionAlerts:true,
emailAlerts:true,
offers:false
}
});


const User = require("../models/User");

const user = await User.findById(req.user.id)
.select("notificationSettings");


if(!user){
return res.status(404).json({
message:"User not found"
});
}


res.json({
settings:user.notificationSettings || {
transactionAlerts:true,
emailAlerts:true,
offers:true
}
});


}catch(err){

res.status(500).json({
message:err.message
});

}

};



exports.updateNotificationSettings = async (req,res)=>{

try{

const User = require("../models/User");

const user = await User.findById(req.user.id);


if(!user){
return res.status(404).json({
message:"User not found"
});
}


user.notificationSettings = {
transactionAlerts:true,
emailAlerts:true,
offers:true,
...(user.notificationSettings || {}),
...req.body
};


await user.save();


res.json({
message:"Notification settings updated",
settings:user.notificationSettings
});


}catch(err){

res.status(500).json({
message:err.message
});

}

};

