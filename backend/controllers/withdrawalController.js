const crypto = require("crypto");
const nodemailer = require("nodemailer");

const WithdrawalRequest = require("../models/WithdrawalRequest");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_APP_PASSWORD
  }
});

exports.createWithdrawalRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const withdrawalAmount = Number(amount);

    if (!withdrawalAmount || withdrawalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid withdrawal amount"
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found"
      });
    }

    if (!user.email) {
      return res.status(400).json({
        success: false,
        message: "User does not have a registered email"
      });
    }

    if (user.balance < withdrawalAmount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient Balance"
      });
    }

    const existingRequest = await WithdrawalRequest.findOne({
      user: id,
      status: "Pending",
      otpExpiresAt: { $gt: new Date() }
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "A withdrawal approval is already pending"
      });
    }

    const otp = crypto.randomInt(100000, 1000000).toString();

    const request = await WithdrawalRequest.create({
      user: id,
      amount: withdrawalAmount,
      otp,
      otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
      status: "Pending"
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "NovaPay Withdrawal Approval OTP",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:25px;border:1px solid #ddd;border-radius:12px">
          <h2>NovaPay Withdrawal Request</h2>

          <p>A withdrawal request has been initiated for your account.</p>

          <p><b>Amount:</b> ₹${withdrawalAmount}</p>

          <p>Your approval OTP is:</p>

          <div style="font-size:32px;font-weight:bold;letter-spacing:8px;padding:15px;background:#f1f5f9;text-align:center;border-radius:10px">
            ${otp}
          </div>

          <p>This OTP is valid for <b>5 minutes</b>.</p>

          <p>If you did not request this withdrawal, please contact support immediately.</p>
        </div>
      `
    });

    await transporter.sendMail({
  from: process.env.MAIL_USER,
  to: user.email,
  subject: "NovaPay Withdrawal OTP",
  text: `Your NovaPay withdrawal approval OTP is: ${otp}

Amount: ₹${withdrawalAmount}

This OTP is valid for 5 minutes.

Do not share this OTP with anyone.`
});

res.status(201).json({
      success: true,
      message: "Withdrawal approval OTP sent to registered email",
      requestId: request._id,
      expiresIn: "5 minutes"
    });

  } catch (err) {
    console.error("CREATE WITHDRAWAL ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


exports.approveWithdrawal = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { otp } = req.body;

    const request = await WithdrawalRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Withdrawal request not found"
      });
    }

    if (request.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Withdrawal request is no longer pending"
      });
    }

    if (request.otpExpiresAt < new Date()) {
      request.status = "Expired";
      await request.save();

      return res.status(400).json({
        success: false,
        message: "OTP expired"
      });
    }

    if (request.otp !== String(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    const user = await User.findById(request.user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.balance < request.amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient Balance"
      });
    }

    user.balance -= request.amount;
    await user.save();

    await Transaction.create({
      sender: user._id,
      amount: request.amount,
      type: "withdraw",
      status: "success",
      details: {
        withdrawalRequestId: request._id
      }
    });

    request.status = "Approved";
    request.approvedAt = new Date();
    await request.save();

    res.json({
      success: true,
      message: "Withdrawal Approved Successfully",
      balance: user.balance
    });

  } catch (err) {
    console.error("APPROVE WITHDRAWAL ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
