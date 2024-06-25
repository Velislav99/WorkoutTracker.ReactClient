import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../shared';
import { useAuthContext } from '../../hooks/useAuthContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useAuthContext();

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
      
      // Store access token in context state and refresh token in localStorage
      dispatch({ type: 'LOGIN', payload: { accessToken: data.accessToken } });
      localStorage.setItem('refreshToken', data.refreshToken);

      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid email or password');
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
