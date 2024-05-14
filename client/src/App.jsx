import { Container, Typography } from '@mui/material'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'


function App() {

  return (

    <Container>
      <Header />
      <Typography variant="h1" align="center" gutterBottom>
       WKT
      </Typography>

      <Typography variant="h2" align="center" gutterBottom>
        Workout Tracker
      </Typography>

      <Footer />
    </Container>


  )
}

export default App
