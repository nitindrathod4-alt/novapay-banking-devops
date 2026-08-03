const PDFDocument = require("pdfkit");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

exports.downloadStatement = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const transactions = await Transaction.find({
      $or: [
        { sender: req.user.id },
        { receiver: req.user.id }
      ]
    })
      .populate("sender", "name username")
      .populate("receiver", "name username")
      .sort({ createdAt: -1 });

    const doc = new PDFDocument({ margin: 40 });

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=NovaPay_Statement_${Date.now()}.pdf`
    );

    doc.pipe(res);

    doc
      .fontSize(24)
      .fillColor("#2563eb")
      .text("🏦 NovaPay Bank", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(18)
      .fillColor("black")
      .text("Account Statement");

    doc.moveDown();

    doc.fontSize(12);

    doc.text(`Name : ${user.name}`);
    doc.text(`Username : ${user.username}`);
    doc.text(`Account No : ${user.accountNumber}`);
    doc.text(`IFSC : ${user.ifsc}`);
    doc.text(`Balance : ₹ ${user.balance}`);
    doc.text(
      `Generated : ${new Date().toLocaleString()}`
    );

    doc.moveDown();

    doc
      .fontSize(16)
      .fillColor("#2563eb")
      .text("Transaction History");

    doc.moveDown();

    transactions.forEach((t) => {
      doc
        .fontSize(12)
        .fillColor("black");

      doc.text(
        `${t.type.toUpperCase()} | ₹${t.amount}`
      );

      doc.text(
        `Sender : ${t.sender?.username || "-"}`
      );

      doc.text(
        `Receiver : ${t.receiver?.username || "-"}`
      );

      doc.text(
        `Date : ${new Date(
          t.createdAt
        ).toLocaleString()}`
      );

      doc.moveDown();
    });

    doc.end();

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};
