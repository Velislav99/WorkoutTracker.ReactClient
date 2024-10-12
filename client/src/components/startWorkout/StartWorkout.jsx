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
                backgroundImage: 'url("https://png.pngtree.com/background/20230528/original/pngtree-an-empty-gym-with-some-equipment-and-dark-walls-picture-image_2773763.jpg")',
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
