import React, { useState, useEffect } from 'react';
import { Button, Box, Modal, TextField, IconButton, Autocomplete, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import WorkoutDisplay from './WorkoutDisplay';
import { baseUrl } from '../../shared';
import { useAuthContext } from '../../hooks/useAuthContext';

const WorkoutForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [workoutStarted, setWorkoutStarted] = useState(false);
    const [endWorkoutOpen, setEndWorkoutOpen] = useState(false);
    const [workoutId, setWorkoutId] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [parameters, setParameters] = useState([]);
    const [parameterNames, setParameterNames] = useState([]);
    const [submittedExercises, setSubmittedExercises] = useState([]);
    const {user} = useAuthContext();

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setSelectedExercise(null);
        setParameters([]);
    };

    useEffect(() => {
        
           

        // Fetch exercises
        fetch(`${baseUrl}api/Exercise/name`, {
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                
                setExercises(data);
            })
            .catch(error => {
                console.error('Error fetching exercises:', error);
            });

        // Fetch parameter names
        fetch(`${baseUrl}api/Exercise/parameter/name/all`, {
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                
                setParameterNames(data);
            })
            .catch(error => {
                console.error('Error fetching parameter names:', error);
            });
    }, []);

    const handleStartWorkout = () => {
        
           

        fetch(`${baseUrl}api/Workout/workout/start`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.accessToken}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                
                setWorkoutId(data.workoutId);
                setWorkoutStarted(true);
            })
            .catch(error => {
                console.error('Error starting workout:', error);
            });
    };

    const handleEndWorkout = () => {
        
           

        fetch(`${baseUrl}api/Workout/workout/end?workoutId=${workoutId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ workoutId })
        })
            .then(data => {
                
                setWorkoutStarted(false);
                setWorkoutId(null);
                setEndWorkoutOpen(false);
            })
            .catch(error => {
                console.error('Error ending workout:', error);
            });
    };

    const handleAddParameter = () => {
        setParameters([...parameters, { name: '', value: '' }]);
    };

    const handleParameterNameChange = (index, event, newValue) => {
        const newParameters = [...parameters];
        newParameters[index].name = newValue ? newValue.value : '';
        setParameters(newParameters);
    };

    const handleParameterValueChange = (index, event) => {
        const newParameters = [...parameters];
        newParameters[index].value = event.target.value;
        setParameters(newParameters);
    };

    const handleRemoveParameter = (index) => {
        const newParameters = parameters.filter((_, i) => i !== index);
        setParameters(newParameters);
    };

    const handleExerciseChange = (event, newValue) => {
        setSelectedExercise(newValue);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        
           

        const exerciseData = {
            trainingSessionId: workoutId,
            exerciseNameId: selectedExercise.id,
            exerciseParameters: parameters.map(param => ({
                nameId: parameterNames.find(p => p.value === param.name)?.id,
                value: param.value
            }))
        };

        try {
            const response = await fetch(`${baseUrl}api/Exercise`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(exerciseData)
            });

            const data = await response.json();
            

            setSubmittedExercises([...submittedExercises, { selectedExercise, parameters }]);
            handleCloseModal();
        } catch (error) {
            console.error('Error submitting exercise:', error);
        }
    };

    return (
        <div>
            {!workoutStarted && (
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ padding: '10px 25px', fontSize: '1.2rem' }}
                    onClick={handleStartWorkout}
                >
                    Start Workout
                </Button>
            )}
            {workoutStarted && (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ padding: '10px 25px', fontSize: '1.2rem' }}
                        onClick={handleOpenModal}
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
            <Modal open={isOpen} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '40%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        lineHeight: 1.4,
                        backgroundColor: '#f1f1f1',
                        padding: '14px 28px',
                        borderRadius: 3,
                        maxWidth: 600,
                        minWidth: 300,
                    }}
                >
                    <Typography variant='h5'>Add Exercise</Typography>
                    <form onSubmit={handleSubmit}>
                        <div className="exercise-select">
                            <Autocomplete
                                options={exercises}
                                getOptionLabel={(option) => option.value}
                                onChange={handleExerciseChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Exercise name"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                                value={selectedExercise}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                            />
                        </div>
                        <div className="exercise-parameters">
                            <Typography variant='h6'>Parameters</Typography>
                            {parameters.map((parameter, index) => (
                                <div key={index} className="parameter-row" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                    <Autocomplete
                                        sx={{ width: 200 }}
                                        options={parameterNames}
                                        getOptionLabel={(option) => option.value}
                                        onChange={(event, newValue) => handleParameterNameChange(index, event, newValue)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Parameter Name"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                        value={parameterNames.find(param => param.value === parameter.name) || null}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                    />
                                    <TextField
                                        label="Value"
                                        name="value"
                                        value={parameter.value}
                                        onChange={(event) => handleParameterValueChange(index, event)}
                                    />
                                    <IconButton onClick={() => handleRemoveParameter(index)}>
                                        <RemoveCircleOutlineIcon />
                                    </IconButton>
                                </div>
                            ))}
                            <IconButton onClick={handleAddParameter}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </div>
                        <Button type="submit" variant="contained" color="primary">
                            Add Exercise
                        </Button>
                    </form>
                </Box>
            </Modal>
            <Modal open={endWorkoutOpen} onClose={() => setEndWorkoutOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '40%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        lineHeight: 1.4,
                        backgroundColor: '#f1f1f1',
                        padding: '14px 28px',
                        borderRadius: 3,
                        maxWidth: 600,
                        minWidth: 300,
                    }}
                >
                    <Typography variant='h5'>End Workout</Typography>
                    <Typography>Are you sure you want to end the workout?</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setEndWorkoutOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleEndWorkout}
                        >
                            End Workout
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default WorkoutForm;
