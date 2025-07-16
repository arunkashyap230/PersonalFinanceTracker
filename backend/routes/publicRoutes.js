
const express = require("express");
const Expense = require("../models/Expense");

const router = express.Router();

// Public route to get all expenses (no login required)
router.get("/public-expenses", async (req, res) => {
  console.log("📥 /api/public-expenses hit");

  try {
    const expenses = await Expense.find().sort({ date: -1 });
    console.log("✅ Expenses fetched:", expenses.length);
    res.json(expenses);
  } catch (err) {
    console.error("❌ Error fetching expenses:", err);
    res.status(500).json({ message: "Failed to fetch public expenses" });
  }
});

module.exports = router;
