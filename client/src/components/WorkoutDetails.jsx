import { Box, Typography } from "@mui/material";

const WorkoutDetails = ({ workout }) => {
    return (
        // <Box sx={{ outline: "1px solid black" }}>
        //     <Typography variant="h1" sx={{ fontSize: "2rem" }}>{workout.name}</Typography>
        //     <Typography>{workout.weights}</Typography>
        //     <Typography>{workout.repetitions}</Typography>
        //     <Typography>{workout.createdAt}</Typography>
        // </Box>
        <Box sx={{ outline: "1px solid black", padding: "1rem", width: "100%", maxWidth: "600px", margin: "0 auto" }}>
            <Typography variant="h1" sx={{ fontSize: "2rem" }}>Situp</Typography>
            <Typography>Weight: 0 (kg)</Typography>
            <Typography>Reps: 20 </Typography>
            <Typography>12/12/12</Typography>
        </Box>
    );
}

export default WorkoutDetails;

