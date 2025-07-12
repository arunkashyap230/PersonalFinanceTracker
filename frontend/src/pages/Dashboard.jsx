import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Box,
  CssBaseline,
  Divider,
  Tooltip,
  Paper,
  Grid,
  useTheme,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  ReceiptLong as ReceiptLongIcon,
  Assessment as AssessmentIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const drawerWidth = 240;

const menuItems = [
  { text: "Add Expense", path: "/add-expense", icon: <AddCircleOutlineIcon /> },
  { text: "View Expenses", path: "/expenses", icon: <ReceiptLongIcon /> },
  { text: "Reports", path: "/reports", icon: <AssessmentIcon /> },
];

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          background: "#1976d2",
        }}
        component={motion.div}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Toolbar>
          <DashboardIcon sx={{ mr: 1 }} />
          <Typography variant="h6" noWrap>
            Expense Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        <Toolbar />
        <Box
          component={motion.div}
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <List>
            {menuItems.map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Tooltip title={item.text} placement="right">
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    selected={location.pathname === item.path}
                    sx={{
                      borderRadius: 1,
                      mx: 1,
                      my: 0.5,
                      "&.Mui-selected": {
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        "& .MuiListItemIcon-root": {
                          color: "#fff",
                        },
                      },
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </Tooltip>
              </motion.div>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ textAlign: "center", px: 2 }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                fullWidth
                sx={{ borderRadius: 8 }}
              >
                Logout
              </Button>
            </motion.div>
          </Box>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component={motion.div}
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        sx={{
          flexGrow: 1,
          p: 4,
          mt: 8,
          background: "linear-gradient(to right, #eef2f3, #ffffff)",
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={3}>
          {/* Welcome Card */}
          <Grid item xs={12}>
            <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h4" gutterBottom>
                Welcome back 👋
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Use the left sidebar to add, view, or analyze your expenses.
              </Typography>
            </Paper>
          </Grid>

          {/* Summary Cards */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                background: "#1976d2",
                color: "white",
              }}
            >
              <Typography variant="subtitle2">Total Expenses</Typography>
              <Typography variant="h5">₹42,300</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                background: "#4caf50",
                color: "white",
              }}
            >
              <Typography variant="subtitle2">This Month</Typography>
              <Typography variant="h5">₹9,500</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                background: "#ff9800",
                color: "white",
              }}
            >
              <Typography variant="subtitle2">Last Expense</Typography>
              <Typography variant="h5">₹1,200</Typography>
            </Paper>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" mb={2}>
                Quick Actions
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/add-expense"
                >
                  + Add New Expense
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  component={Link}
                  to="/reports"
                >
                  View Reports
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Dashboard;
