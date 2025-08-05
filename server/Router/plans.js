const express = require("express");
const router = express.Router();
const { getDB } = require("../Config/db");

router.get("/category/:id", async (req, res) => {
  const { id } = req.params;
  const db = getDB();

  try {
    const [plans] = await db.query("SELECT * FROM packages WHERE category_id = ?", [id]);
    res.json(plans);
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
