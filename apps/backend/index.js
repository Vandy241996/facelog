const express = require("express");
const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// PostgreSQL connection with SSL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => {
    console.error("❌ Failed to connect to PostgreSQL:", err); // full error
    process.exit(1);
  });

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`Hello from PostgreSQL! Time is ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send("DB error: " + err.message);
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
