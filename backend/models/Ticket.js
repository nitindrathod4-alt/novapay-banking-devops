const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

subject:{
type:String,
required:true
},

category:{
type:String,
required:true
},

message:{
type:String,
required:true
},

status:{
type:String,
default:"Open"
},

reply:{
type:String,
default:""
}

},{
timestamps:true
});


module.exports = mongoose.model("Ticket",ticketSchema);
