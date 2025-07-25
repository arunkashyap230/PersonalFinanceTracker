import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ExpenseForm.css";

function ExpenseForm({ expenseToEdit, onSuccess }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    date: "",
    paymentMethod: "",
    notes: "",
  });

  useEffect(() => {
    if (expenseToEdit) {
      setForm(expenseToEdit);
    }
  }, [expenseToEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (expenseToEdit) {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/expenses/${expenseToEdit._id}`,
          form,
          config
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/expenses`,
          form,
          config
        );
      }

      alert("Expense saved!");
      setForm({
        amount: "",
        category: "",
        date: "",
        paymentMethod: "",
        notes: "",
      });
      onSuccess();
    } catch (err) {
      alert("Success");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2>{expenseToEdit ? "Edit" : "Add"} Expense</h2>

      <input
        name="amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
      />

      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
      />

      <input
        name="paymentMethod"
        value={form.paymentMethod}
        onChange={handleChange}
        placeholder="Payment Method"
        required
      />

      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Notes"
      ></textarea>

      <button type="submit">{expenseToEdit ? "Update" : "Add"}</button>
    </form>
  );
}

export default ExpenseForm;
