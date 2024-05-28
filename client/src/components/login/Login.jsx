import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Paper, Typography, Link } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../App';
import { baseUrl } from '../../shared';

const LoginForm = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      if (data.accessToken) {
        setLoggedIn(true);
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid email or password');
      setLoggedIn(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error && 'Invalid email or password'}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
            helperText={error && 'Invalid email or password'}
          />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            <Link href="/forgot-password">Forgot password?</Link>
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, color: 'primary.main' }}>
            <Link href="/register">Not registered?</Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;
