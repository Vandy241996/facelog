const express = require("express");
const cors = require("cors");
require("dotenv").config();
const supabase = require("./db.js"); // Supabase client

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("✅ Supabase-powered backend is running!");
});

app.get("/users", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Health check using Supabase (query current time)
app.get("/health", async (req, res) => {
  try {
    const { data, error } = await supabase.rpc("now"); // Use a Postgres function or fallback
    if (error) throw error;
    res.send(`Supabase is alive! Time: ${data}`);
  } catch (err) {
    res.status(500).send("Supabase error: " + err.message);
  }
});

app.get("/users", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
