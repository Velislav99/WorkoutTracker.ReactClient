import { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import { LoginContext } from '../../App';
import WorkoutForm from '../WorkoutForm';



export default function CreateWorkout() {


    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    return (

        <Box
            sx={{
                display: 'flex',
                padding: '1rem',
            }} 
            
        >
            <Box >

                <WorkoutForm />
            
            </Box>

        </Box>
    );
}