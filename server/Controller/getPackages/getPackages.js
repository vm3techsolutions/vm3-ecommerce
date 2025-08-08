const { getDB } = require("../../Config/db");



exports.packages = async (req, res) => {
  try {
    const pool = getDB(); 
    const [rows] = await pool.query("SELECT * FROM packages");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};