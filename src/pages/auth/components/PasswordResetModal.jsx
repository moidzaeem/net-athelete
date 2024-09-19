import React, { useState } from "react";
import { Modal, TextField, Button, CircularProgress, Box } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const PasswordResetModal = ({ open, handleClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/reset-password`,
        { email }
      );

      toast.success(response.data.message);
      handleClose();
    } catch (error) {
      toast.error("Error sending password reset request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>Reset Password</h2>
        <TextField
          variant="outlined"
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Send Reset Link"}
        </Button>
      </Box>
    </Modal>
  );
};

export default PasswordResetModal;
