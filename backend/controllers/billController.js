const BillPayment = require("../models/BillPayment");
const User = require("../models/User");
const Transaction = require("../models/Transaction");


exports.billPayment = async(req,res)=>{

try{

const {service,provider,consumer,amount}=req.body;


const user = await User.findById(req.user.id);


if(user.balance < amount){

return res.status(400).json({
message:"Insufficient Balance"
});

}


user.balance -= amount;

await user.save();


const bill = await BillPayment.create({

user:user._id,
service,
provider,
consumer,
amount

});


await Transaction.create({

sender:user._id,
amount,
type:"bill_payment",

details:{
service,
provider,
consumer
}

});


res.json({

success:true,
message:"Bill Payment Successful",
bill

});


}catch(err){

res.status(500).json({
message:err.message
});

}

};
