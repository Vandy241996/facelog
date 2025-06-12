const express = require("express");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// PostgreSQL connection
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// pool
//   .connect()
//   .then(() => console.log("✅ Connected to PostgreSQL"))
//   .catch((err) => {
//     console.error("❌ Failed to connect to PostgreSQL:", err);
//     process.exit(1);
//   });

// Basic root test
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Optional: DB health route
app.get("/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`PostgreSQL is alive! Time: ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send("DB error: " + err.message);
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
