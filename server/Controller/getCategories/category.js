// const express = require("express");
// const router = express.Router();

const { getDB } = require("../../Config/db");



exports.category = async (req, res) => {
  try {
    const pool = getDB(); // ✅ get the initialized pool
    const [rows] = await pool.query("SELECT * FROM categories");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

