import React from 'react';
import Box from '@mui/material/Box';
import WorkoutForm from './WorkoutForm';

export default function StartWorkout() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
                height: '100vh',
                backgroundImage: 'url("https://as2.ftcdn.net/v2/jpg/08/09/48/25/1000_F_809482598_iFY3RUsAXrpaJAuFh2UijLuLhGMQYJDb.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '8px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: '600px',
                    maxHeight: '80vh',
                    overflow: 'auto',
                }}
            >
                <WorkoutForm />
            </Box>
        </Box>
    );
}
