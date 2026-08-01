const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("🏦 NovaPay Backend API Running...");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "UP",
    message: "NovaPay Backend is Healthy",
    time: new Date(),
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
