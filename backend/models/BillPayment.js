const mongoose = require("mongoose");

const billPaymentSchema = new mongoose.Schema({

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

service:{
type:String,
required:true
},

provider:{
type:String,
required:true
},

consumer:{
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


module.exports = mongoose.model("BillPayment", billPaymentSchema);
