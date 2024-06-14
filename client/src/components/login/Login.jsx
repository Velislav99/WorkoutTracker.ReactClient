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
      
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('tokenExpiry', Date.now() + data.expiresIn * 1000);

      dispatch({ type: 'LOGIN', payload: data });

      if (data.accessToken) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid email or password');
    }
  };

  const isTokenExpired = () => {
    const expiryTime = localStorage.getItem('tokenExpiry');
    return Date.now() > expiryTime;
  };

  const refreshAccessToken = async () => {
    try {
      const response = await fetch(`${baseUrl}refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('tokenExpiry', Date.now() + data.expiresIn * 1000);
    } catch (error) {
      console.error('Error refreshing token:', error);
      // Handle logout if refreshing token fails
    }
  };

  const makeApiRequest = async (url, options = {}) => {
    if (isTokenExpired()) {
      await refreshAccessToken();
    }

    const accessToken = localStorage.getItem('accessToken');
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };

    return fetch(url, options);
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
