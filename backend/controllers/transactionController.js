const User = require("../models/User");
const Transaction = require("../models/Transaction");

exports.balance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name username balance");

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
