import { useState, useEffect } from 'react';
import { Button, Box, Modal, TextField, IconButton, Autocomplete, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import WorkoutDisplay from './WorkoutDisplay';

const WorkoutForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [exersices, setExersices] = useState([]);
    const [selectedExersice, setSelectedExersice] = useState(null);
    const [parameters, setParameters] = useState([]);
    const [submittedExersices, setSubmittedExersices] = useState([]);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setSelectedExersice(null);
        setParameters([]);
    };

    useEffect(() => {
        // Replace with your API call to fetch exersices
        setExersices([
            { id: 1, name: 'Push-ups' },
            { id: 2, name: 'Squats' },
            { id: 3, name: 'Deadlifts' },
        ]);
    }, []);

    const handleAddParameter = () => {
        setParameters([...parameters, { name: '', value: '' }]);
    };

    const handleParameterChange = (index, event) => {
        const newParameters = [...parameters];
        newParameters[index][event.target.name] = event.target.value;
        setParameters(newParameters);
    };

    const handleRemoveParameter = (index) => {
        const newParameters = parameters.filter((_, i) => i !== index);
        setParameters(newParameters);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmittedExersices([...submittedExersices, { selectedExersice, parameters }]);
        handleCloseModal();
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpenModal}>
                Add
            </Button>
            <Modal open={isOpen} onClose={handleCloseModal}>
                <Box sx={{
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
                }}>
                    <Typography variant='h5'>Add Exercise</Typography>
                    <form onSubmit={handleSubmit}>
                        <div className="exersice-select">
                            <Autocomplete
                                options={exersices}
                                getOptionLabel={(option) => option.name}
                                onChange={(event, newValue) => setSelectedExersice(newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Exercise name"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                                value={selectedExersice}
                            />
                        </div>
                        <div className="exersice-parameters">
                            <Typography variant='h6'>Parameters</Typography>
                            {parameters.map((parameter, index) => (
                                <div key={index} className="parameter-row" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                    <TextField
                                        label="Parameter Name"
                                        name="name"
                                        value={parameter.name}
                                        onChange={(event) => handleParameterChange(index, event)}
                                    />
                                    <TextField
                                        label="Value"
                                        name="value"
                                        value={parameter.value}
                                        onChange={(event) => handleParameterChange(index, event)}
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
            <WorkoutDisplay exersices={submittedExersices} />
        </div>
    );
};

export default WorkoutForm;
