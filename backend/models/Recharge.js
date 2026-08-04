const mongoose = require("mongoose");

const rechargeSchema = new mongoose.Schema({

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

mobile:{
type:String,
required:true
},

operator:{
type:String,
required:true
},

amount:{
type:Number,
required:true
},

status:{
type:String,
default:"Success"
}

},{
timestamps:true
});


module.exports = mongoose.model("Recharge", rechargeSchema);
