import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";

function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(`${BASE_URL}/api/auth/register`, form);
      navigate("/");
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #83a4d4, #b6fbff)",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{ p: 4, maxWidth: 400, width: "100%", borderRadius: 3 }}
      >
        <Typography variant="h5" align="center" mb={3}>
          Create an Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              fullWidth
            />

            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default SignupPage;
