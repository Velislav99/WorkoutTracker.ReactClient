import React from 'react';
import { Box, Typography } from '@mui/material';

const WorkoutDisplay = ({ workouts }) => {
    if (!workouts || workouts.length === 0) return null;

    return (
        <div>
            {workouts.map((workout, index) => (
                <Box key={index} sx={{ outline: "1px solid black", padding: "1rem", width: "100%", margin: "1rem auto" }}>
                    <Typography variant="h1" sx={{ fontSize: "2rem" }}>
                        {workout.selectedWorkout.name}
                    </Typography>
                    {workout.parameters.map((param, paramIndex) => (
                        <Typography key={paramIndex}>
                            {param.name} : {param.value}
                        </Typography>
                    ))}
                </Box>
            ))}
        </div>
    );
};

export default WorkoutDisplay;
