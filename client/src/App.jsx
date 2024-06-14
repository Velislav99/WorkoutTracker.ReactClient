
import { Box } from '@mui/material';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { createContext } from 'react';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import StartWorkout from './components/startWorkout/StartWorkout';

import './global.css'; // Import the global CSS

export const LoginContext = createContext();

function App() {
  const { user } = useAuthContext();
  
  

  return (
    
      <BrowserRouter>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100%',
          }}
        >
          <Header />
          <Box
            component="main"
            sx={{
              flex: '1 0 auto',
              width: '100%',
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path="/start-workout" element={user ? <StartWorkout /> : <Navigate to="/login" />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </BrowserRouter>
    
  );
}

export default App;
