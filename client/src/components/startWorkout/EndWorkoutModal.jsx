import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const EndWorkoutModal = ({ open, onClose, workoutComment, setWorkoutComment, handleEndWorkout }) => {
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
                <Typography variant='h5'>End Workout</Typography>
                <Typography>Are you sure you want to end the workout?</Typography>
                <TextField
                    label="Comment"
                    variant="outlined"
                    fullWidth
                    value={workoutComment}
                    onChange={(e) => setWorkoutComment(e.target.value)}
                    sx={{ marginTop: '10px', marginBottom: '20px' }}
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
                        onClick={handleEndWorkout}
                    >
                        End Workout
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EndWorkoutModal;
