import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    if (!newPassword) {
      setError("Password cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/reset-password`,
        { token, newPassword }
      );

      toast.success(response.data.message);
      navigate("/"); // Redirect to login after successful reset
    } catch (error) {
      console.error("Password reset failed:", error);
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20 }}>
      <h2>Reset Password</h2>
      <TextField
        variant="outlined"
        label="New Password"
        type="password"
        fullWidth
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        error={!!error}
        helperText={error}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleResetPassword}
        disabled={loading}
        style={{ marginTop: 20 }}
        fullWidth
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
      </Button>
    </div>
  );
};

export default ResetPasswordPage;
