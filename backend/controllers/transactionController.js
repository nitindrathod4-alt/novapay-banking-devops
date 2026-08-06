const User = require("../models/User");
const Transaction = require("../models/Transaction");

exports.balance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "name username balance accountNumber ifsc status branchName accountType accountOpenDate photo aadhaarNumber panNumber kycStatus createdAt"
    );

    res.json({
      success: true,
      balance: user.balance,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deposit = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const user = await User.findById(req.user.id);

    user.balance += Number(amount);
    await user.save();

    await Transaction.create({
      receiver: user._id,
      amount: Number(amount),
      type: "deposit",
      status: "success",

      details:{
        mode:"Cash Deposit"
      }
    });

    res.json({
      success: true,
      message: "Amount Deposited Successfully",
      balance: user.balance,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.withdraw = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const user = await User.findById(req.user.id);

    if (user.balance < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient Balance",
      });
    }

    user.balance -= Number(amount);
    await user.save();

    await Transaction.create({
      sender: user._id,
      amount: Number(amount),
      type: "withdraw",
      status: "success",

      details:{
        mode:"Cash Withdrawal"
      }
    });

    res.json({
      success: true,
      message: "Amount Withdrawn Successfully",
      balance: user.balance,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.transfer = async (req, res) => {
  try {
    const { username, amount } = req.body;

    const sender = await User.findById(req.user.id);
    const receiver = await User.findOne({ username });

    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "Receiver not found",
      });
    }

    if (sender.username === receiver.username) {
      return res.status(400).json({
        success: false,
        message: "Cannot transfer to yourself",
      });
    }

    if (sender.balance < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient Balance",
      });
    }

    sender.balance -= Number(amount);
    receiver.balance += Number(amount);

    await sender.save();
    await receiver.save();

    await Transaction.create({
      sender: sender._id,
      receiver: receiver._id,
      amount: Number(amount),
      type: "transfer",
      status: "success",

      details:{
        receiverUsername: receiver.username,
        receiverName: receiver.name
      }
    });

    res.json({
      success: true,
      message: "Money Transferred Successfully",
      balance: sender.balance,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.history = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [
        { sender: req.user.id },
        { receiver: req.user.id }
      ]
    })
      .populate("sender", "name username")
      .populate("receiver", "name username")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      transactions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.allTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("sender", "name username")
      .populate("receiver", "name username")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      transactions,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// ================= FILTER TRANSACTIONS =================

exports.filterTransactions = async (req, res) => {
  try {
    const { type, username, from, to } = req.query;

    let filter = {};

    if (type) {
      filter.type = type;
    }

    if (username) {
      filter.username = {
        $regex: username,
        $options: "i",
      };
    }

    if (from || to) {
      filter.createdAt = {};

      if (from) {
        filter.createdAt.$gte = new Date(from);
      }

      if (to) {
        filter.createdAt.$lte = new Date(to);
      }
    }

    const transactions = await Transaction.find(filter)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      transactions,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// ================= EXPORT TRANSACTIONS EXCEL =================

const ExcelJS = require("exceljs");

exports.exportTransactions = async (req, res) => {

  try {

    const transactions = await Transaction.find()
      .populate("sender", "username")
      .populate("receiver", "username");

    const workbook = new ExcelJS.Workbook();

    const sheet = workbook.addWorksheet("Transactions");

    sheet.columns = [
      { header: "Sender", key: "sender", width: 20 },
      { header: "Receiver", key: "receiver", width: 20 },
      { header: "Type", key: "type", width: 15 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Status", key: "status", width: 15 },
      { header: "Date", key: "date", width: 25 },
    ];

    transactions.forEach((t) => {

      sheet.addRow({
        sender: t.sender?.username || "-",
        receiver: t.receiver?.username || "-",
        type: t.type,
        amount: t.amount,
        status: t.status,
        date: t.createdAt,
      });

    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=NovaPay-Transactions.xlsx"
    );

    await workbook.xlsx.write(res);

    res.end();

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};



// ================= FIND USER BY MOBILE NUMBER =================

exports.findUserByMobile = async (req,res)=>{
  try {

    const { mobileNumber } = req.params;

    const user = await User.findOne({
      mobileNumber
    }).select("-password");

    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found"
      });
    }

    res.json({
      success:true,
      user:{
        name:user.name,
        username:user.username,
        mobileNumber:user.mobileNumber,
        accountNumber:user.accountNumber,
        bankName:"NovaPay Bank",
        balance:user.balance
      }
    });

  } catch(err){

    res.status(500).json({
      success:false,
      message:err.message
    });

  }
};


// ================= FIND USER BY MOBILE NUMBER =================

exports.findUserByMobile = async (req,res)=>{
  try {

    const { mobileNumber } = req.params;

    const user = await User.findOne({
      mobileNumber
    }).select("-password");

    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found"
      });
    }

    res.json({
      success:true,
      user:{
        name:user.name,
        username:user.username,
        mobileNumber:user.mobileNumber,
        accountNumber:user.accountNumber,
        bankName:"NovaPay Bank",
        balance:user.balance
      }
    });

  } catch(err){

    res.status(500).json({
      success:false,
      message:err.message
    });

  }
};


exports.mySpending = async (req,res)=>{

try{

const Transaction = require("../models/Transaction");

const userId = req.user.id;


const transactions = await Transaction.find({
sender:userId,
type:{
$in:[
"transfer",
"mobile_recharge",
"bill_payment",
"withdraw"
]
}
});


const today = new Date();


const todaySpent = transactions
.filter(t=>{
return new Date(t.createdAt).toDateString() === today.toDateString();
})
.reduce((sum,t)=>sum+t.amount,0);


const result={

todaySpent,

totalSpent:
transactions.reduce((sum,t)=>sum+t.amount,0),

breakdown:{

transfer:
transactions
.filter(t=>t.type==="transfer")
.reduce((sum,t)=>sum+t.amount,0),

mobile_recharge:
transactions
.filter(t=>t.type==="mobile_recharge")
.reduce((sum,t)=>sum+t.amount,0),

bill_payment:
transactions
.filter(t=>t.type==="bill_payment")
.reduce((sum,t)=>sum+t.amount,0),

withdraw:
transactions
.filter(t=>t.type==="withdraw")
.reduce((sum,t)=>sum+t.amount,0)

}

};


res.json(result);


}catch(err){

res.status(500).json({
message:err.message
});

}

};
