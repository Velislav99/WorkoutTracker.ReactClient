
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button } from '@mui/material';


const WorkoutForm = () => {
    // const[title, setTitle] = useState('')
    // const[load, setLoad] = useState('')
    // const[reps, setReps] = useState('')
    // const[error, setError] = useState(null)

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const workout = {title, load, reps}

    //     const resposne = await fetch('http://localhost:5000/workouts', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(workout)
    //     })

    //     const json = await response.json()

    //     if (!response.ok) {
    //        setError(json.error)
    //     }
    //     if (response.ok) {
    //         setTitle('')
    //         setLoad('')
    //         setReps('')
    //         setError(null)
    //         console.log(json)
    //     }
    // }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
                paddingLeft: '3rem',
            }}
            noValidate
            autoComplete="off"
        >
            <form >

                <FormControl>
                    <InputLabel htmlFor="component-outlined">Exercise Name</InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        label="Name"
                        //onChange={(e) => setTitle(e.target.value)}
                        //value={title}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="component-outlined">Weights</InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        label="Weights"
                        //onChange={(e) => setLoad(e.target.value)}
                       // value={load}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="component-outlined">Repetitions</InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        label="Reps"
                        // onChange={(e) => setReps(e.target.value)}
                        // value={reps}
                    />
                </FormControl>
            </form>
            <Button variant="contained">Add Exercise</Button>
        </Box>
    )
}
export default WorkoutForm;