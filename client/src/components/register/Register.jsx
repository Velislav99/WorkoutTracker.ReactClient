import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../shared';

const passwordRequirements = 'Password must be at least 8 characters long,\n and include an uppercase letter,\n a lowercase letter, and a special character.';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });
  const [passwordHelperText, setPasswordHelperText] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let valid = true;
    let emailError = '';
    let passwordError = '';

    if (!emailRegex.test(formData.email)) {
      emailError = 'Invalid email address';
      valid = false;
    }

    if (!passwordRegex.test(formData.password)) {
      passwordError = passwordRequirements;
      valid = false;
    }

    setErrors({ email: emailError, password: passwordError, general: '' });
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({ email: '', password: '', general: '' });
    setPasswordHelperText('');

    if (!validateForm()) {
      return;
    }

    const url = `${baseUrl}register`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || 'Registration failed');
          });
        }
    
      })
      .then((data) => {
        console.log(data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error:', error);
        
      });
  };

  const handlePasswordFocus = () => {
    setPasswordHelperText(passwordRequirements);
  };

  const handlePasswordBlur = () => {
    setPasswordHelperText('');
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
          Register
        </Typography>
        {errors.general && (
          <Typography variant="body2" color="error" gutterBottom>
            {errors.general}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            type="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            name="password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password || passwordHelperText}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            sx={{ whiteSpace: 'pre-line' }}
          />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
