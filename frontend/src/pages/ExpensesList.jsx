import React, { useEffect, useState } from "react";
import axios from "axios";
import ExpenseForm from "./ExpenseForm";
import "./ExpensesList.css";

function ExpensesList() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    paymentMethod: "",
    date: "",
  });
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch expenses
  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/api/expenses", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setExpenses(res.data);
    setFilteredExpenses(res.data);
    setEditingExpense(null);
  };

  // Fetch categories
  const fetchCategories = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/expenses/categories",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setCategories(res.data);
  };

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = [...expenses];

    if (filters.search) {
      const term = filters.search.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.category.toLowerCase().includes(term) ||
          (e.notes && e.notes.toLowerCase().includes(term))
      );
    }

    if (filters.category) {
      filtered = filtered.filter((e) => e.category === filters.category);
    }

    if (filters.paymentMethod) {
      filtered = filtered.filter(
        (e) => e.paymentMethod === filters.paymentMethod
      );
    }

    if (filters.date) {
      filtered = filtered.filter((e) => e.date.startsWith(filters.date));
    }

    setFilteredExpenses(filtered);
  }, [filters, expenses]);

  const deleteExpense = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchExpenses();
    }
  };

  return (
    <div className="container">
      <h2>All Expenses</h2>

      {/* Filters */}
      <div className="expense-filters">
        <input
          type="text"
          placeholder="Search category or notes"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={filters.paymentMethod}
          onChange={(e) =>
            setFilters({ ...filters, paymentMethod: e.target.value })
          }
        >
          <option value="">All Payment Methods</option>
          <option value="UPI">UPI</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Cash">Cash</option>
        </select>

        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
      </div>

      {/* Edit Form */}
      {editingExpense && (
        <ExpenseForm expenseToEdit={editingExpense} onSuccess={fetchExpenses} />
      )}

      {/* Expense List */}
      <ul className="expense-list">
        {filteredExpenses.map((exp) => (
          <li key={exp._id} className="expense-item">
            ₹{exp.amount} - {exp.category} on {exp.date} ({exp.paymentMethod})
            <div>
              <button onClick={() => setEditingExpense(exp)}>Edit</button>
              <button onClick={() => deleteExpense(exp._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpensesList;
