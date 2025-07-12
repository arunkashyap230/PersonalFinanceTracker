import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Paper,
  Grid,
  Stack,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import ExpenseForm from "./ExpenseForm";
import { Delete, Edit, Search } from "@mui/icons-material";

function ExpensesList() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    paymentMethod: "",
    date: "",
  });
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/expenses`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setExpenses(res.data);
      setFilteredExpenses(res.data);
    } finally {
      setLoading(false);
      setEditingExpense(null);
    }
  };

  const fetchCategories = async () => {
    const res = await axios.get(`${BASE_URL}/api/expenses/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCategories(res.data);
  };

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

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
      await axios.delete(`${BASE_URL}/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchExpenses();
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" mb={3}>
        Your Expenses
      </Typography>

      {/* Filter Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search notes or category"
              variant="outlined"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              InputProps={{
                startAdornment: <Search sx={{ mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={6} md={2}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
                label="Category"
              >
                <MenuItem value="">All</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} md={2}>
            <FormControl fullWidth>
              <InputLabel>Payment</InputLabel>
              <Select
                value={filters.paymentMethod}
                onChange={(e) =>
                  setFilters({ ...filters, paymentMethod: e.target.value })
                }
                label="Payment"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="UPI">UPI</MenuItem>
                <MenuItem value="Credit Card">Credit Card</MenuItem>
                <MenuItem value="Cash">Cash</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              type="date"
              fullWidth
              label="Date"
              InputLabelProps={{ shrink: true }}
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Edit Form */}
      {editingExpense && (
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" mb={2}>
            Edit Expense
          </Typography>
          <ExpenseForm
            expenseToEdit={editingExpense}
            onSuccess={fetchExpenses}
          />
        </Paper>
      )}

      {/* Expenses List */}
      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : filteredExpenses.length === 0 ? (
        <Box textAlign="center" mt={4}>
          <Typography variant="body1" color="text.secondary">
            No expenses found with the selected filters.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredExpenses.map((exp, index) => (
            <Grid item xs={12} sm={6} md={4} key={exp._id}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    position: "relative",
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <Typography variant="h6" color="primary">
                    ₹{exp.amount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    {exp.category} | {exp.paymentMethod} | {exp.date}
                  </Typography>
                  {exp.notes && (
                    <Typography variant="body2" color="text.secondary">
                      Notes: {exp.notes}
                    </Typography>
                  )}
                  <Stack direction="row" spacing={1} mt={2}>
                    <Tooltip title="Edit">
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => setEditingExpense(exp)}
                        startIcon={<Edit />}
                      >
                        Edit
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => deleteExpense(exp._id)}
                        startIcon={<Delete />}
                      >
                        Delete
                      </Button>
                    </Tooltip>
                  </Stack>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default ExpensesList;
