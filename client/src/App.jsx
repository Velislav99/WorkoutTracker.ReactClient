import { Box,} from '@mui/material'
import { Routes, Route, BrowserRouter, } from 'react-router-dom';
import { createContext, useState } from 'react';

import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import CreateWorkout from './components/createWorkout/CreateWorkout';

export const LoginContext = createContext();

function App() {

  const [loggedIn, setLoggedIn] = useState(localStorage.accessToken ? true : false);

  function changeLoggedIn(value) {
    setLoggedIn(value);
    if(value === false) {
      localStorage.clear();
    }
  }
  return (
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <BrowserRouter>
      
      <Box sx={{ width: {
              xs: '100%', 
              lg: '70%',  
            }, margin: '0 auto' }}>
        
          <Header />

          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/start workout" element={<CreateWorkout />} />
          </Routes>

          <Footer />
        </Box>

      </BrowserRouter>
    </LoginContext.Provider>


  )
}

export default App
