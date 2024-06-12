import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
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
    const [exercises, setExercises] = useState([]);
    const [parameterNames, setParameterNames] = useState([]);
    const [submittedExercises, setSubmittedExercises] = useState([]);
    const [workoutComment, setWorkoutComment] = useState('');
    const { user } = useAuthContext();
    //const navigate = useNavigate();

    const fetchExercises = async () => {
        try {
            const response = await fetch(`${baseUrl}api/Exercise/name`, {
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
            });
            const data = await response.json();
            setExercises(data);
        } catch (error) {
            console.error('Error fetching exercises:', error);
        }
    };

    const fetchParameterNames = async () => {
        try {
            const response = await fetch(`${baseUrl}api/Exercise/parameter/name/all`, {
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
            });
            const data = await response.json();
            setParameterNames(data);
        } catch (error) {
            console.error('Error fetching parameter names:', error);
        }
    };

    useEffect(() => {
        fetchExercises();
        fetchParameterNames();
    }, [user.accessToken]);

    const handleStartWorkout = () => setStartWorkoutOpen(true);

    const handleConfirmStartWorkout = async () => {
        try {
            const response = await fetch(`${baseUrl}api/Workout/Start/${workoutName}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`,
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
                    'Authorization': `Bearer ${user.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(workoutComment)
            });
            setWorkoutStarted(false);
            setWorkoutId(null);
            setEndWorkoutOpen(false);
            //navigate('/');
        } catch (error) {
            console.error('Error ending workout:', error);
        }
    };

    return (
        <div>
            {workoutName && <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    color: '#333', // Adjust color as needed
                    marginBottom: '1rem', // Add spacing at the bottom
                }}
            >
                {workoutName}
            </Typography>}

            <div style={{ display: 'flex', justifyContent: 'center', marginRight:'2rem' }}>
                {!workoutStarted && (
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ padding: '10px 25px', fontSize: '1.2rem', }}
                        onClick={handleStartWorkout}
                    >
                        Start Workout
                    </Button>
                )}
            </div>
            {workoutStarted && (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ padding: '10px 25px', fontSize: '1.2rem' }}
                        onClick={() => setIsOpen(true)}
                    >
                        Add Exercise
                    </Button>
                </>
            )}
            <WorkoutDisplay exercises={submittedExercises} />
            {workoutStarted && (
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ padding: '10px 25px', fontSize: '1.2rem', marginTop: '10px' }}
                    onClick={() => setEndWorkoutOpen(true)}
                >
                    End Workout
                </Button>
            )}
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
                exercises={exercises}
                parameterNames={parameterNames}
                workoutId={workoutId}
                user={user}
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
        </div>
    );
};

export default WorkoutForm;
