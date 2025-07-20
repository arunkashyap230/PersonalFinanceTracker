import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  CssBaseline,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  TextField,
  Divider,
  useMediaQuery,
  Fab,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PublicIcon from "@mui/icons-material/Public";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/public-expenses`
        );
        setExpenses(res.data);
      } catch (err) {
        console.error("Error fetching expenses:", err);
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

  const drawer = (
    <Box>
      <Toolbar
        sx={{
          background: "linear-gradient(to right, #7b1fa2, #9c27b0)",
          color: "#fff",
        }}
      >
        <Typography variant="h6">💸 MyExpenses</Typography>
      </Toolbar>
      <Divider />
      <List sx={{ p: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 2,
              mb: 1,
              transition: "all 0.3s",
              "&.Mui-selected": {
                backgroundColor: "#f3e5f5",
                color: "#8e24aa",
                fontWeight: 600,
                "& .MuiListItemIcon-root": { color: "#8e24aa" },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          background: "linear-gradient(to right, #8e24aa, #ba68c8)",
        }}
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
          <Typography variant="h6" noWrap>
            Public Expenses Portal
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box component="nav">
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
                borderRight: "1px solid #ddd",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          background: "linear-gradient(to bottom, #f3e5f5, #ffffff)",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: "#fff",
              boxShadow: "0px 10px 20px rgba(0,0,0,0.05)",
              mb: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                color="primary"
                sx={{ color: "#8e24aa" }}
              >
                🌍 Public Expenses
              </Typography>
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ width: { xs: "100%", sm: 250 }, backgroundColor: "#fff" }}
              />
            </Box>
          </Paper>

          {filteredExpenses.length === 0 ? (
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              sx={{ mt: 6 }}
            >
              🚫 No public expenses found.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {filteredExpenses.map((exp, idx) => (
                <Grid item xs={12} sm={6} md={4} key={exp._id}>
                  <Card
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.07 }}
                    elevation={6}
                    sx={{
                      borderRadius: 4,
                      background: "rgba(255, 255, 255, 0.75)",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, mb: 1 }}
                        color="secondary"
                      >
                        ₹{exp.amount}
                      </Typography>
                      <Stack direction="row" spacing={1} mb={1}>
                        <Chip
                          label={exp.category}
                          color="secondary"
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
                        📅 {exp.date?.slice(0, 10)}
                      </Typography>
                      <Typography variant="body2">
                        📝 {exp.notes || <i>No additional notes</i>}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>

        {/* Floating Add Button (optional) */}
        <Fab
          color="secondary"
          aria-label="add"
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            display: { xs: "flex", md: "none" },
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
}

export default PublicExpensesPage;
