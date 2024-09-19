const express = require("express");
const mongoose = require("mongoose");
const Player = require("./Player");
const cors = require("cors");
const app = express();

app.use(cors());

require("dotenv").config();

const port = process.env.PORT || 3001;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process if the connection fails
  });

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to Whack-a-Mole backend!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(express.json()); // Middleware to parse incoming JSON data

// Route to submit player data
app.post("/submit-player", async (req, res) => {
  const { playerName, score, hitRate } = req.body;

  // Basic validation for playerName(can't be only spaces)
  if (
    !playerName ||
    typeof playerName !== "string" ||
    playerName.trim() === ""
  ) {
    return res.status(400).json({ error: "Invalid or missing playerName" });
  }

  // Allow score to be 0, but it should still be a number
  if (typeof score !== "number" || isNaN(score)) {
    return res.status(400).json({ error: "Invalid or missing score" });
  }

  // Ensure hitRate is a number (can be 0, but not undefined or NaN)
  if (typeof hitRate !== "number" || isNaN(hitRate)) {
    return res.status(400).json({ error: "Invalid or missing hitRate" });
  }

  try {
    // Create a new player record
    const newPlayer = new Player({ playerName, score, hitRate });
    await newPlayer.save();

    // Send a response back to the frontend
    res
      .status(201)
      .json({ message: "Player data saved successfully!", player: newPlayer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/leaderboard/highest-scores", async (req, res) => {
  try {
    // Find players, sort by score in descending order, limit to top 10
    const players = await Player.find().sort({ score: -1 }).limit(10);
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/leaderboard/fastest-hit-rates", async (req, res) => {
  try {
    const players = await Player.find({ hitRate: { $gt: 0 } })
      .sort({ hitRate: 1 })
      .limit(10);
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
