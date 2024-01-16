import React, { useState } from "react";
import { TextField, Button, Container, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../hooks/baseURL";
const Login = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [userLogin, setUserLogin] = useState();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUserLogin({
      ...userLogin,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, userLogin);
      const data = response.data;
      const token = data.token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
      console.log(err);
    }
  };
  return (
    <Container
      maxWidth="xs"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h2>Sign in to your account</h2>
      {error && <Alert severity="error">{error}</Alert>}
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <TextField
            id="email"
            label="Email Address"
            type="email"
            name="email"
            autoComplete="email"
            required
            fullWidth
            margin="normal"
            onChange={handleChange}
            placeholder="TK: admin@gmail.com"
          />
        </div>
        <div>
          <TextField
            id="password"
            label="Password"
            type="text"
            placeholder="MK: 123456"
            autoComplete="current-password"
            required
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            backgroundColor: isHovered ? "black" : "white",
            color: isHovered ? "white" : "black",
            marginTop: "20px",
          }}
          fullWidth
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default Login;
