const db = require("../../Config/db");

const getPackageByCategoryID = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const [rows] = await db.query(
      "SELECT * FROM packages WHERE category_id = ?",
      [categoryId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No packages found for this category" });
    }

    res.json(rows);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = { getPackageByCategoryID };
