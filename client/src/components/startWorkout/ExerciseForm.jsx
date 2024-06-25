import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, IconButton, Autocomplete, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { baseUrl } from '../../shared';

const ExerciseForm = ({ isOpen, onClose, exercises, parameterNames, workoutId, accessToken, submittedExercises, setSubmittedExercises }) => {
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [parameters, setParameters] = useState([]);
    const [formError, setFormError] = useState('');

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

    const resetForm = () => {
        setSelectedExercise(null);
        setParameters([]);
        setFormError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedExercise) {
            setFormError('Please select an exercise.');
            return;
        }

        for (let param of parameters) {
            if (!param.name || !param.value) {
                setFormError('Please fill out all parameter fields.');
                return;
            }
        }

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
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(exerciseData)
            });

            const data = await response.json();
            setSubmittedExercises([...submittedExercises, { selectedExercise, parameters }]);
            resetForm();  
            onClose();
        } catch (error) {
            console.error('Error submitting exercise:', error);
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
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
                    maxHeight: '60vh',
                    overflow: 'auto',
                }}
            >
                <Typography variant='h5'>Add Exercise</Typography>
                {formError && <Typography color="error">{formError}</Typography>}
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
                                    required
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
                        Add 
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default ExerciseForm;
