import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button } from '@mui/material';

export default function ComposedTextField() {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
        >
            <FormControl>
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
            <Button variant="contained">Create Exercise</Button>
        </Box>
    );
}