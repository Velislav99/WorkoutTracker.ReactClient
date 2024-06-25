import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, TextField, Typography, Container } from '@mui/material';
import WorkoutDisplay from './WorkoutDisplay';
import StartWorkoutModal from './StartWorkoutModal';
import EndWorkoutModal from './EndWorkoutModal';
import ExerciseForm from './ExerciseForm';
import { baseUrl } from '../../shared';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const WorkoutForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [workoutStarted, setWorkoutStarted] = useState(false);
    const [endWorkoutOpen, setEndWorkoutOpen] = useState(false);
    const [startWorkoutOpen, setStartWorkoutOpen] = useState(false);
    const [workoutName, setWorkoutName] = useState('');
    const [workoutId, setWorkoutId] = useState(null);
    const [parameterNames, setParameterNames] = useState([]);
    const [submittedExercises, setSubmittedExercises] = useState([]);
    const [workoutComment, setWorkoutComment] = useState('');
    const [workoutTime, setWorkoutTime] = useState(``);
    const [buttonVisible, setButtonVisible] = useState(true);

    const { accessToken } = useAuthContext();

    const navigate = useNavigate();


    useEffect(() => {
        async function fetchIsActive() {
            try {
                let response = await fetch(`${baseUrl}api/Workout/HasActive`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                });
                response = await response.json();

                if (response.hasActiveWorkout) {
                    setWorkoutStarted(true);
                    setWorkoutName(response.workout.name);
                    setWorkoutId(response.workout.id);
                    setSubmittedExercises(response.workout.exercises.map(exercise => ({
                        selectedExercise: { value: exercise.name },
                        parameters: exercise.parameters
                    })));

                }
            } catch (error) {
                console.error('Error fetching active workout:', error);
            }
        }

        fetchIsActive();
    }, [accessToken]);
    
    const fetchParameterNames = async () => {
        try {
            const response = await fetch(`${baseUrl}api/Exercise/parameter/name/all`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const data = await response.json();
            setParameterNames(data);
        } catch (error) {
            console.error('Error fetching parameter names:', error);
        }
    };

    useEffect(() => {
        fetchParameterNames();
    }, [accessToken]);

    const handleStartWorkout = () => setStartWorkoutOpen(true);

    const handleRestartWorkout = () => { navigate('/'); };

    const handleConfirmStartWorkout = async () => {
        try {
            const response = await fetch(`${baseUrl}api/Workout/Start/${workoutName}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setWorkoutId(data.workoutId);
            setWorkoutStarted(true);
            setStartWorkoutOpen(false);
        } catch (error) {
            console.error('Error starting workout:', error);
        }
    };

    const handleEndWorkout = async () => {
        try {
            const response = await fetch(`${baseUrl}api/Workout/End?workoutId=${workoutId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(workoutComment)
            });
            const data = await response.json();
            setWorkoutStarted(false);
            setWorkoutId(null);
            setEndWorkoutOpen(false);
            setButtonVisible(false);

            let timeParts = [];

            if (data?.days !== undefined && data.days !== 0) {
                timeParts.push(`${data.days} days`);
            }
            if (data?.hours !== undefined && data.hours !== 0) {
                timeParts.push(`${data.hours} hours`);
            }
            if (data?.minutes !== undefined && data.minutes !== 0) {
                timeParts.push(`${data.minutes} minutes`);
            }
            if (data?.seconds !== undefined && data.seconds !== 0) {
                timeParts.push(`${data.seconds} seconds`);
            }

            setWorkoutTime(`That workout took ${timeParts.join(', ')}.`)


        } catch (error) {
            console.error('Error ending workout:', error);
        }
    };

    return (
        <Box>
            {workoutName && <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    color: '#333',
                    marginBottom: '1rem',
                }}
            >
                {workoutName}
            </Typography>}

            <div style={{ display: 'flex', justifyContent: 'center', marginRight: '2rem' }}>
                {!workoutStarted && buttonVisible && (
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ padding: '10px 25px', fontSize: '1.2rem', }}
                        onClick={handleStartWorkout}
                    >
                        Start Workout
                    </Button>
                )}
                {!buttonVisible && (
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ padding: '10px 25px', fontSize: '1.2rem', }}
                        onClick={handleRestartWorkout}
                    >
                        Go back to the home page
                    </Button>
                )}
            </div>
            {workoutStarted && (
                <Box sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    backgroundColor: 'white',
                    padding: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            fontSize: '3.5rem',
                            margin: '1rem',
                            minWidth: '8vh',
                            height: '8vh',

                        }}
                        onClick={() => setIsOpen(true)}
                    >
                        +
                    </Button>


                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            fontSize: '2rem',
                            marginRight: '2rem',
                            height: '8vh',
                        }}
                        onClick={() => setEndWorkoutOpen(true)}
                    >
                        End Workout
                    </Button>
                </Box>

            )}
            <WorkoutDisplay exercises={submittedExercises} />
            <StartWorkoutModal
                open={startWorkoutOpen}
                onClose={() => setStartWorkoutOpen(false)}
                workoutName={workoutName}
                setWorkoutName={setWorkoutName}
                handleConfirmStartWorkout={handleConfirmStartWorkout}
            />
            <ExerciseForm
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
               
                parameterNames={parameterNames}
                workoutId={workoutId}
                accessToken={accessToken}
                submittedExercises={submittedExercises}
                setSubmittedExercises={setSubmittedExercises}
            />
            <EndWorkoutModal
                open={endWorkoutOpen}
                onClose={() => setEndWorkoutOpen(false)}
                workoutComment={workoutComment}
                setWorkoutComment={setWorkoutComment}
                handleEndWorkout={handleEndWorkout}
            />
            <Typography variant="h6" sx={{ marginTop: '1rem' }}>
                {workoutTime}
            </Typography>
        </Box>
    );
};

export default WorkoutForm;
