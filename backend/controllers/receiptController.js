const PDFDocument = require("pdfkit");
const Transaction = require("../models/Transaction");


exports.downloadReceipt = async(req,res)=>{

try{

const transaction = await Transaction.findById(req.params.id)
.populate("sender","name username")
.populate("receiver","name username");


if(!transaction){

return res.status(404).json({
message:"Transaction not found"
});

}


res.setHeader(
"Content-Type",
"application/pdf"
);


res.setHeader(
"Content-Disposition",
`attachment; filename=NovaPay_Receipt_${transaction._id}.pdf`
);


const doc = new PDFDocument();


doc.pipe(res);


doc.fontSize(22)
.text("🏦 NovaPay Bank",{align:"center"});


doc.moveDown();


doc.fontSize(16)
.text("Transaction Receipt");


doc.moveDown();


doc.fontSize(12)
.text(`Transaction ID: ${transaction._id}`);

doc.text(`Type: ${transaction.type}`);

doc.text(`Amount: ₹${transaction.amount}`);

doc.text(`Status: ${transaction.status}`);


if(transaction.details){

doc.moveDown();

doc.text("Details:");

Object.keys(transaction.details).forEach(key=>{

doc.text(`${key}: ${transaction.details[key]}`);

});

}


doc.moveDown();

doc.text(
`Date: ${transaction.createdAt}`
);


doc.end();


}catch(err){

res.status(500).json({
message:err.message
});

}

};
