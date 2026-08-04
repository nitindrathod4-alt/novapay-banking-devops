const Ticket = require("../models/Ticket");


exports.createTicket = async(req,res)=>{

try{

const {subject,category,message}=req.body;


const ticket = await Ticket.create({

user:req.user.id,
subject,
category,
message

});


res.json({

success:true,
message:"Ticket Created Successfully",
ticket

});


}catch(err){

res.status(500).json({
message:err.message
});

}

};



exports.myTickets = async(req,res)=>{

try{

const tickets = await Ticket.find({
user:req.user.id
})
.sort({
createdAt:-1
});


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
