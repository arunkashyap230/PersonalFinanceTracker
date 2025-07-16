import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
  Stack,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  CssBaseline,
  TextField,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PublicIcon from "@mui/icons-material/Public";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  { text: "Login", path: "/login", icon: <LoginIcon /> },
  { text: "Signup", path: "/signup", icon: <PersonAddIcon /> },
  { text: "Public Expenses", path: "/", icon: <PublicIcon /> },
];

function PublicExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/public-expenses`
        );
        setExpenses(res.data);
      } catch (err) {
        console.error("Error fetching expenses:", err); // ✅ Add this
        alert("Failed to load public expenses");
      }
    };

    fetchExpenses();
  }, []);

  const filteredExpenses = expenses.filter(
    (exp) =>
      exp.category.toLowerCase().includes(search.toLowerCase()) ||
      exp.paymentMethod.toLowerCase().includes(search.toLowerCase()) ||
      exp.notes?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#e3f2fd",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ ml: 1 }}>
            💰 Expense App
          </Typography>
        </Toolbar>
        <Divider />
        <Box sx={{ p: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  "&.Mui-selected": {
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    "& .MuiListItemIcon-root": { color: "#fff" },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          backgroundColor: "#f9f9f9",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4">🌍 All Public Expenses</Typography>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: 250 }}
            />
          </Box>

          {filteredExpenses.length === 0 ? (
            <Typography color="text.secondary">
              No public expenses available.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {filteredExpenses.map((exp, idx) => (
                <Grid item xs={12} sm={6} md={4} key={exp._id}>
                  <Card
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    elevation={3}
                    sx={{
                      borderRadius: 3,
                      background: "#ffffff",
                      transition: "0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        ₹{exp.amount}
                      </Typography>
                      <Stack direction="row" spacing={1} mb={1}>
                        <Chip
                          label={exp.category}
                          color="primary"
                          size="small"
                        />
                        <Chip
                          label={exp.paymentMethod}
                          variant="outlined"
                          size="small"
                        />
                      </Stack>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Date: {exp.date?.slice(0, 10)}
                      </Typography>
                      <Typography variant="body2">
                        Notes: {exp.notes || <i>None</i>}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default PublicExpensesPage;
