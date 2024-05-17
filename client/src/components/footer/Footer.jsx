// Footer.js
import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <ul>
              <li>
                <Link to="/aboutus" variant="body2">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" variant="body2">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/career" variant="body2">
                  Careers
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Resources
            </Typography>
            <ul>
              <li>
                <Link to="/blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/documentation" variant="body2">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/tutorials" variant="body2">
                  Tutorials
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <ul>
              <li>
                <Link to="/privacy" variant="body2">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/tos" variant="body2">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <ul>
              <li>
                <Link to="#" variant="body2">
                  Twitter
                </Link>
              </li>
              <li>
                <Link to="#" variant="body2">
                  Facebook
                </Link>
              </li>
              <li>
                <Link to="#" variant="body2">
                  Instagram
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
        <Box mt={5} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
