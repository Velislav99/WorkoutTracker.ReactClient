import React, { useEffect, useState, useContext} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { baseUrl } from '../../shared';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../App';



const LoginForm = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = baseUrl + 'login';
    fetch(url, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        
        console.log(localStorage.accessToken);
      });
      navigate('/');
      setLoggedIn(true);
    
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
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
