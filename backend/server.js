const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const MONGO_URI =
  "mongodb+srv://dheerajthummapala2127_db_user:Dheeru07@cluster0.xqvnamh.mongodb.net/portfolioDB";

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// Middleware
const app = express();
app.use(cors());
app.use(express.json());

// Import model
const Contact = require("./models/Contact");

// Test route (optional, for checking server)
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Contact form route
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();
    res.status(201).json({ success: true, message: "Message saved" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
