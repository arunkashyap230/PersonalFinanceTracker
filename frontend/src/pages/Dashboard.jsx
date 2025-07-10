import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div>
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
          </ul>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </aside>

      <main className="main-content">
        <h2>Welcome to your Dashboard</h2>
        <p>Select an option from the left to get started.</p>
      </main>
    </div>
  );
}

export default Dashboard;
