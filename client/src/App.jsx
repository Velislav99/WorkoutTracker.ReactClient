import CssBaseline from '@mui/material/CssBaseline'

import { Box } from '@mui/material';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import StartWorkout from './components/startWorkout/StartWorkout';
import MyWorkouts from './components/myWorkouts/MyWorkouts';

import './global.css';
import Profile from './components/profile/Profile';

function App() {
  const { accessToken } = useAuthContext();

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
            <Route path="/login" element={!accessToken ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!accessToken ? <Register /> : <Navigate to="/" />} />
            <Route path="/start-workout" element={accessToken ? <StartWorkout /> : <Navigate to="/login" />} />
            <Route path="/my-workouts" element={accessToken ? <MyWorkouts /> : <Navigate to="/login" />} />
            <Route path="/profile" element={accessToken ? <Profile /> : <Navigate to="/login" />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;
