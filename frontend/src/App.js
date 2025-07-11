import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import ExpenseForm from "./pages/ExpenseForm";
import ExpensesList from "./pages/ExpensesList";
import ReportsPage from "./pages/ReportsPage";
import PublicExpensesPage from "./pages/PublicExpensesPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicExpensesPage />} />{" "}
      {/* 👈 Set as default page */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-expense" element={<ExpenseForm />} />
      <Route path="/expenses" element={<ExpensesList />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/public-expenses" element={<PublicExpensesPage />} />
    </Routes>
  );
}

export default App;
