const User = require("../models/User");

// ================= GET PROFILE =================

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= UPDATE KYC =================

exports.updateKyc = async (req, res) => {
  try {
    const { aadhaarNumber, panNumber } = req.body;

    if (!aadhaarNumber || !panNumber) {
      return res.status(400).json({
        success: false,
        message: "Aadhaar and PAN are required",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.aadhaarNumber = aadhaarNumber;
    user.panNumber = panNumber;
    user.kycStatus = "Pending";

    await user.save();

    res.json({
      success: true,
      message: "KYC submitted successfully",
      user: {
        aadhaarNumber: user.aadhaarNumber,
        panNumber: user.panNumber,
        kycStatus: user.kycStatus,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET KYC STATUS =================

exports.getKycStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "aadhaarNumber panNumber aadhaarDocument panDocument kycStatus"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      kyc: {
        aadhaarNumber: user.aadhaarNumber,
        panNumber: user.panNumber,
        aadhaarDocument: user.aadhaarDocument,
        panDocument: user.panDocument,
        kycStatus: user.kycStatus,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= UPLOAD DOCUMENTS =================

exports.uploadDocuments = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (req.files?.aadhaarDocument) {
      user.aadhaarDocument =
        req.files.aadhaarDocument[0].filename;
    }

    if (req.files?.panDocument) {
      user.panDocument =
        req.files.panDocument[0].filename;
    }

    await user.save();

    res.json({
      success: true,
      message: "Documents uploaded successfully",
      documents: {
        aadhaarDocument: user.aadhaarDocument,
        panDocument: user.panDocument,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

