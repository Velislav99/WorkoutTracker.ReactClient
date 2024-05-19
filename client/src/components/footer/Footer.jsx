import React from 'react';
import { Typography, Box, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2, backgroundColor: 'background.paper' }}>
      <Typography variant="body2" color="text.secondary" align="center">
        © 2024 Your Company Name
        {' '}
        <Link href="#" underline="none" color="inherit">
          Privacy Policy
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;