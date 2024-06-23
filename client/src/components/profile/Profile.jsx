import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const Profile = () => {
    const [username, setUsername] = useState("");
    const [weight, setWeight] = useState(null);
    const [bodyFat, setBodyFat] = useState(null);

    const handleUsernameSubmit = (e) => {
        e.preventDefault();
        console.log(username);
    };
    const handlePersonalSubmit = (e) => {
        e.preventDefault();
        console.log(weight);
        console.log(bodyFat);
    };

    return (
        <Box sx={{width:'20%', margin:'20vh'}}>
            <form onSubmit={handleUsernameSubmit}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Button variant="contained" type="submit"  sx={{ mt: 2 }}>
                    Submit
                </Button>
            </form>
            <form onSubmit={handlePersonalSubmit}>
                <TextField
                    label="Weight (kg)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
                <TextField
                    label="Body Fat %"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={bodyFat}
                    onChange={(e) => setBodyFat(e.target.value)}
                />
                <Button variant="contained" type="submit"  sx={{ mt: 2 }}>
                    Submit
                </Button>
            </form>
            
        </Box>
        
    );
};

export default Profile;
