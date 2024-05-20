import { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import { LoginContext } from '../../App';
import WorkoutDetails from '../WorkoutDetails';
import WorkoutForm from '../WorkoutForm';


export default function CreateWorkout() {

    // const [workouts, setWorkouts] = useState(null)

    // useEffect(() => {
    //     const fetchWorkouts = async () => {
    //         const response = await fetch('http://localhost:5000/workouts')
    //         const json = await response.json()
    //     }

    //     if (response.ok) {
    //         setWorkouts(json)
    //     }
    //     fetchWorkouts()
    // }, [])

    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    return (

        <Box
            component="form"
            sx={{
            
                display: 'flex',
                padding: '1rem',
            }}
            noValidate
            autoComplete="off"
            
        >
            {/* <Box>
                {workouts && workouts.map((workout) => (
                   <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </Box> */}
            <Box>

                <WorkoutDetails />

            </Box>


            {/* <FormControl>
                <InputLabel htmlFor="component-outlined">Exercise Name</InputLabel>
                <OutlinedInput
                    id="component-outlined"
                    label="Name"
                />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="component-outlined">Weights</InputLabel>
                <OutlinedInput
                    id="component-outlined"
                    label="Weights"
                />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="component-outlined">Repetitions</InputLabel>
                <OutlinedInput
                    id="component-outlined"
                    label="Name"
                />
            </FormControl>
            <Button variant="contained">Create Exercise</Button> */}
            <Box>

                <WorkoutForm />
            </Box>
        </Box>
    );
}