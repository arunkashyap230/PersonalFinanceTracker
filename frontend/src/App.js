import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import ExpenseForm from "./pages/ExpenseForm";
import ExpensesList from "./pages/ExpensesList";
import ReportsPage from "./pages/ReportsPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-expense" element={<ExpenseForm />} />
      <Route path="/expenses" element={<ExpensesList />} />
      <Route path="/reports" element={<ReportsPage />} />
    </Routes>
  );
}

export default App;
