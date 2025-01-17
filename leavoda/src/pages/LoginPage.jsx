import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { TextField, Button, Container } from "@mui/material";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/filter?key=username&value=${username}`);
      dispatch(login(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
};

export default LoginPage;