import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/"); // ✅ Redirect to LoginPage
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <ul className="dashboard-links">
        <li>
          <Link to="/add-expense">Add Expense</Link>
        </li>
        <li>
          <Link to="/expenses">View Expenses</Link>
        </li>
        <li>
          <Link to="/reports">Reports</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Dashboard;
