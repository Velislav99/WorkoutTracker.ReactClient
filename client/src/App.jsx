import { Container } from '@mui/material'
import { Routes, Route, BrowserRouter, } from 'react-router-dom';

import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import CreateWorkout from './components/createWorkout/CreateWorkout';


function App() {

  return (
    <BrowserRouter>
      <Container>
        <Header />

        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="/create workout" element={<CreateWorkout />} /> 
        </Routes>
       
        <Footer/>
      </Container>

    </BrowserRouter>


  )
}

export default App
