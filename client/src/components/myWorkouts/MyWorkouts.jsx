import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { baseUrl } from '../../shared';
import {
    Box,
    CircularProgress,
    Container,
    List,
    ListItem,
    ListItemText,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Pagination,
    Paper
} from '@mui/material';

const MyWorkouts = () => {
    const { user } = useAuthContext();
    const [myWorkouts, setMyWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [workoutDetails, setWorkoutDetails] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const workoutsPerPage = 10;

    useEffect(() => {
        async function fetchMyWorkouts() {
            try {
                const response = await fetch(`${baseUrl}api/Workout/MyWorkouts`, {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const sortedData = data.sort((a, b) => new Date(b.started) - new Date(a.started));
                setMyWorkouts(sortedData);
            } catch (error) {
                console.error('Error fetching workouts:', error);
            } finally {
                setLoading(false);
            }
        }

        if (user?.accessToken) {
            fetchMyWorkouts();
        }
    }, [user]);

    const handleWorkoutClick = async (workoutId) => {
        setDetailsLoading(true);
        try {
            const response = await fetch(`${baseUrl}api/Workout/details/${workoutId}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setWorkoutDetails(data);
        } catch (error) {
            console.error('Error fetching workout details:', error);
        } finally {
            setDetailsLoading(false);
        }
    };

    const handleClose = () => {
        setWorkoutDetails(null);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const indexOfLastWorkout = currentPage * workoutsPerPage;
    const indexOfFirstWorkout = indexOfLastWorkout - workoutsPerPage;
    const currentWorkouts = myWorkouts.slice(indexOfFirstWorkout, indexOfLastWorkout);

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                My Workouts
            </Typography>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            ) : (
                <Paper elevation={3}>
                    <List>
                        {myWorkouts.length === 0 ? (
                            <Typography variant="body1" align="center" sx={{ padding: 2 }}>No workouts found</Typography>
                        ) : (
                            currentWorkouts.map(workout => (
                                <ListItem
                                    key={workout.id}
                                    divider
                                    button
                                    onClick={() => handleWorkoutClick(workout.id)}
                                >
                                    <ListItemText
                                        primary={workout.name}
                                        secondary={`${new Date(workout.started).toLocaleString()} - ${workout.isFinished ? 'Finished' : 'In Progress'}`}
                                        primaryTypographyProps={{ variant: 'h5' }}  
                                        secondaryTypographyProps={{ variant: 'body2' }}  
                                    />
                                </ListItem>
                            ))
                        )}
                    </List>
                    <Box display="flex" justifyContent="center" alignItems="center" padding={2}>
                        <Pagination
                            count={Math.ceil(myWorkouts.length / workoutsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                </Paper>
            )}

            <Dialog open={Boolean(workoutDetails)} onClose={handleClose}>
                <DialogTitle>Workout Details</DialogTitle>
                <DialogContent>
                    {detailsLoading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                            <CircularProgress />
                        </Box>
                    ) : workoutDetails ? (
                        <Box>
                            <Typography variant="h6">{workoutDetails.name}</Typography>
                            <Typography variant="body1">{`Comment: ${workoutDetails.comment}`}</Typography>
                            <Typography variant="body1">{`Started: ${new Date(workoutDetails.started).toLocaleString()}`}</Typography>
                            <Typography variant="body1">{`Duration: ${workoutDetails.duration.days} days, ${workoutDetails.duration.hours} hours, ${workoutDetails.duration.minutes} minutes, ${workoutDetails.duration.seconds} seconds`}</Typography>
                            <Typography variant="body1">{`Status: ${workoutDetails.isFinished ? 'Finished' : 'In Progress'}`}</Typography>
                            <Typography variant="h6">Exercises:</Typography>
                            <List>
                                {workoutDetails.exercises.map(exercise => (
                                    <ListItem key={exercise.id}>
                                        <ListItemText
                                            primary={exercise.name}
                                            secondary={exercise.parameters.map(param => `${param.name}: ${param.value}`).join(', ')}
                                            primaryTypographyProps={{ variant: 'h6' }}
                                            secondaryTypographyProps={{ variant: 'body1' }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    ) : (
                        <Typography variant="body1">No details available</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default MyWorkouts;
