const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const authMiddleware = require("../middleware/auth");

// 👉 CREATE - Add a new expense
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newExpense = new Expense({ ...req.body, user: req.user.id });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).send("Failed to add expense");
  }
});

// 👉 READ - Get all expenses of the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).send("Failed to fetch expenses");
  }
});

// 👉 UPDATE - Edit a specific expense
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).send("Expense not found");
    res.json(updated);
  } catch (err) {
    res.status(500).send("Failed to update expense");
  }
});

// 👉 DELETE - Delete a specific expense
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deleted) return res.status(404).send("Expense not found");
    res.send("Expense deleted");
  } catch (err) {
    res.status(500).send("Failed to delete expense");
  }
});

// 📊 GET Report Summary (for dashboard)
router.get("/report", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });

    const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    const categoryWise = {};
    const dateWise = {};
    const paymentMethodMap = {};

    expenses.forEach((exp) => {
      categoryWise[exp.category] =
        (categoryWise[exp.category] || 0) + exp.amount;
      dateWise[exp.date] = (dateWise[exp.date] || 0) + exp.amount;
      paymentMethodMap[exp.paymentMethod] =
        (paymentMethodMap[exp.paymentMethod] || 0) + 1;
    });

    const topPaymentMethods = Object.entries(paymentMethodMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([method]) => method);

    const topCategory =
      Object.entries(categoryWise).sort((a, b) => b[1] - a[1])[0]?.[0] || "";

    res.json({
      totalSpent,
      categoryWise,
      dateWise,
      topCategory,
      topPaymentMethods,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to generate report");
  }
});

router.get("/categories", authMiddleware, async (req, res) => {
  try {
    const categories = await Expense.distinct("category", {
      user: req.user.id,
    });
    res.json(categories);
  } catch (err) {
    res.status(500).send("Failed to fetch categories");
  }
});

module.exports = router;
