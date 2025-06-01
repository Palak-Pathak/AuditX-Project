const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /api/reports
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM reports ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
