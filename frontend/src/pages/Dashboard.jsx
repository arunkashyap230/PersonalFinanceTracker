import React from "react";
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
  useMediaQuery,
  IconButton,
  Avatar,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  ReceiptLong as ReceiptLongIcon,
  Assessment as AssessmentIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const drawerWidth = 250;

const menuItems = [
  { text: "Add Expense", path: "/add-expense", icon: <AddCircleOutlineIcon /> },
  { text: "View Expenses", path: "/expenses", icon: <ReceiptLongIcon /> },
  { text: "Reports", path: "/reports", icon: <AssessmentIcon /> },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const drawer = (
    <Box>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Avatar src="/logo192.png" sx={{ width: 56, height: 56 }} />
      </Toolbar>
      <List>
        {menuItems.map((item, index) => (
          <motion.div
            key={item.text}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Tooltip title={item.text} placement="right">
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  mx: 2,
                  my: 1,
                  borderRadius: 2,
                  px: 3,
                  backgroundColor:
                    location.pathname === item.path ? "#1e88e5" : "transparent",
                  color: location.pathname === item.path ? "#fff" : "#333",
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: location.pathname === item.path ? "#fff" : "#1976d2",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Tooltip>
          </motion.div>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Box textAlign="center" px={2}>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ borderRadius: 10, px: 4 }}
          >
            Logout
          </Button>
        </motion.div>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
          ml: isMobile ? 0 : `${drawerWidth}px`,
          background: "linear-gradient(to right, #1e88e5, #42a5f5)",
          boxShadow: 3,
        }}
        component={motion.div}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <DashboardIcon sx={{ mr: 1 }} />
          <Typography variant="h6" noWrap>
            Expense Tracker Pro
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#fafafa",
            borderRight: "1px solid #e0e0e0",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box
        component={motion.div}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{
          flexGrow: 1,
          p: 4,
          mt: 8,
          background: "linear-gradient(to right, #f8fbff, #ffffff)",
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                background: "linear-gradient(135deg, #2196f3, #21cbf3)",
                color: "#fff",
              }}
            >
              <Typography variant="h4">Welcome 👋</Typography>
              <Typography variant="body1">
                Easily manage your expenses, view reports and stay on track.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "#1e88e5",
                color: "#fff",
              }}
            >
              <Typography variant="subtitle1">Total Expenses</Typography>
              <Typography variant="h4">₹42,300</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "#43a047",
                color: "#fff",
              }}
            >
              <Typography variant="subtitle1">This Month</Typography>
              <Typography variant="h4">₹9,500</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "#fb8c00",
                color: "#fff",
              }}
            >
              <Typography variant="subtitle1">Last Expense</Typography>
              <Typography variant="h4">₹1,200</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/add-expense"
                  sx={{ borderRadius: 8, px: 3 }}
                >
                  + Add Expense
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  component={Link}
                  to="/reports"
                  sx={{ borderRadius: 8, px: 3 }}
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
