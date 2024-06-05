
import Box from '@mui/material/Box';
import WorkoutForm from './WorkoutForm';
import { Typography } from '@mui/material';

export default function StartWorkout() {
    

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column', // Arrange children in a column
                alignItems: 'left', // Center items horizontally
                padding: '1rem',
                width: '100%',
            }}
        >
            <Typography variant='h2' sx={{ padding: '1rem', color: 'primary.main' }}>
                Start Workout
            </Typography>
            <WorkoutForm />
        </Box>
    );
}
