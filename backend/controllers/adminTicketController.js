const Ticket = require("../models/Ticket");


exports.allTickets = async(req,res)=>{

try{

const tickets = await Ticket.find()
.populate("user","name username")
.sort({createdAt:-1});


res.json({
success:true,
tickets
});


}catch(err){

res.status(500).json({
message:err.message
});

}

};



exports.updateTicket = async(req,res)=>{

try{

const {status,reply}=req.body;


const ticket = await Ticket.findByIdAndUpdate(
req.params.id,
{
status,
reply
},
{
new:true
}
);


res.json({
success:true,
ticket
});


}catch(err){

res.status(500).json({
message:err.message
});

}

};
