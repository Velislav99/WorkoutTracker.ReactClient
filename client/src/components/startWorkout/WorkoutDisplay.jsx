import React from 'react';
import { Box, Typography } from '@mui/material';
import { fadeIn } from './WorkoutAnimations';

const WorkoutDisplay = ({ exercises }) => {
    if (!exercises || exercises.length === 0) return null;

    return (
        <div>
            {exercises.map((exercise, index) => (
                <Box
                    key={index}
                    sx={{
                        padding: "1rem",
                        width: "80%",
                        margin: "1rem 0",
                        boxShadow: "0 10px 20px rgba(200, 20, 200, 0.1)",
                        animation: `${fadeIn} 0.6s ease-in-out`
                    }}
                >
                    <Typography variant="h1" sx={{ fontSize: "2rem", color: 'primary.main' }}>
                        {exercise.selectedExercise.value}
                    </Typography>
                    
                    {exercise.parameters.map((param, paramIndex) => (
                        <Typography key={paramIndex}>
                            <span style={{ fontWeight: 'bold' }}> {param.name} </span>: {param.value}
                        </Typography>
                    ))}
                </Box>
            ))}
        </div>
    );
};

export default WorkoutDisplay;
