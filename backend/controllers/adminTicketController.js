const Ticket = require("../models/Ticket");


// GET ALL TICKETS
exports.allTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("user", "name username")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      tickets,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// UPDATE / REPLY TICKET
exports.updateTicket = async (req, res) => {
  try {
    const { status, reply } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      {
        ...(status && { status }),
        ...(reply !== undefined && { reply }),
      },
      {
        new: true,
      }
    ).populate("user", "name username");

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.json({
      success: true,
      message: "Ticket updated successfully",
      ticket,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
