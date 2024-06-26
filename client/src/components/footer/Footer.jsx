import React from 'react';
import { Typography, Box, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2, backgroundColor: '#111111' }}>
      <Typography variant="body2" color="primary.main" align="center">
        © 2024 WorkoutTracker
        {' '}
        <Link href="#" underline="none" color="inherit">
          Privacy Policy
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;