import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const StartWorkoutModal = ({ open, onClose, workoutName, setWorkoutName, handleConfirmStartWorkout }) => {
    return (
        <Modal open={open} onClose={onClose}>
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
                <Typography variant='h5'>Start Workout</Typography>
                <TextField
                    label="Workout Name"
                    variant="outlined"
                    fullWidth
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    sx={{ marginBottom: '20px' }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleConfirmStartWorkout}
                    >
                        Start Workout
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default StartWorkoutModal;
