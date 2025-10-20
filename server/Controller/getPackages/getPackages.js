const db = require("../../Config/db");

// Get all categories
const getPackages = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM packages");
    res.json(rows);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = { getPackages };