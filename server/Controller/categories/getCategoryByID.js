// const db = require("../../config/db");

const db = require("../../Config/db");

const getCategoryByID = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = { getCategoryByID };
