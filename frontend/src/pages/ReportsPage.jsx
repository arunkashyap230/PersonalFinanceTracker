import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function ReportsPage() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          "http://localhost:5000/api/expenses/report",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setReport(res.data);
      } catch (err) {
        alert("Failed to fetch report");
      }
    };
    fetchReport();
  }, []);

  if (!report) return <div>Loading...</div>;

  const pieData = {
    labels: Object.keys(report.categoryWise || {}),
    datasets: [
      {
        data: Object.values(report.categoryWise || {}),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const lineData = {
    labels: Object.keys(report.dateWise || {}),
    datasets: [
      {
        label: "Daily Spend",
        data: Object.values(report.dateWise || {}),
        fill: false,
        borderColor: "blue",
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Reports</h2>

      <p>
        <strong>Total Spent:</strong> ₹{report.totalSpent}
      </p>
      <p>
        <strong>Top Category:</strong> {report.topCategory}
      </p>
      <p>
        <strong>Top Payment Methods:</strong>{" "}
        {report.topPaymentMethods?.join(", ")}
      </p>

      <div style={{ width: "400px", margin: "auto" }}>
        <h3>Category Wise Spending</h3>
        <Pie data={pieData} />
      </div>

      <div style={{ width: "600px", margin: "auto", marginTop: "40px" }}>
        <h3>Daily Spending Trend</h3>
        <Line data={lineData} />
      </div>
    </div>
  );
}

export default ReportsPage;
