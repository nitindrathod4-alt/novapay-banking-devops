const User = require("../models/User");

exports.publicDeposit = async (req, res) => {
  try {
    const { username, amount } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found"
      });
    }

    user.balance += Number(amount);

    await user.save();

    res.json({
      success: true,
      message: "Amount Deposited Successfully",
      balance: user.balance
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
