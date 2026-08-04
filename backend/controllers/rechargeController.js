const Recharge = require("../models/Recharge");
const User = require("../models/User");
const Transaction = require("../models/Transaction");


exports.mobileRecharge = async(req,res)=>{

try{

const {mobile,operator,amount}=req.body;


const user = await User.findById(req.user.id);


if(user.balance < amount){
return res.status(400).json({
message:"Insufficient Balance"
});
}


user.balance -= amount;

await user.save();


const recharge = await Recharge.create({

user:user._id,
mobile,
operator,
amount

});


await Transaction.create({

sender:user._id,
amount,
type:"mobile_recharge",

details:{
mobile,
operator
}

});


res.json({

success:true,
message:"Mobile Recharge Successful",
recharge

});


}catch(err){

res.status(500).json({
message:err.message
});

}

};
