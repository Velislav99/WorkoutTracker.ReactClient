import React from 'react';
import Box from '@mui/material/Box';
import WorkoutForm from './WorkoutForm';
import { Typography } from '@mui/material';

export default function StartWorkout() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column', // Arrange children in a column
                alignItems: 'center', // Center items horizontally
                justifyContent: 'center', // Center items vertically
                padding: '1rem',
                width: '100%',
                height: '100vh', // Full height of the viewport
                backgroundColor: '#f0f0f0', // Light gray background
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '8px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Optional: Adds a subtle shadow for better visibility
                    width: '100%',
                    maxWidth: '600px', // Maximum width of the form box
                }}
            >
                <WorkoutForm />
            </Box>
        </Box>
    );
}
