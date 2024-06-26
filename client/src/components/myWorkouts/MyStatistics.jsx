import CssBaseline from '@mui/material/CssBaseline';
import {
    Box,
    Container,
    Typography,
    useTheme,
    useMediaQuery,
    Autocomplete,
    TextField,
    Button,
    Grid
} from '@mui/material';

import { useContext, useEffect, useState } from 'react';
import { baseUrl } from '../../shared';
import { Line } from 'react-chartjs-2';
import { AuthContext } from '../../context/AuthContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const MyStatistics = () => {
    const [exercises, setExercises] = useState([]);
    const [exerciseId, setExerciseId] = useState(null);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isExercisesFetched, setIsExercisesFetched] = useState(false);

    const { accessToken } = useContext(AuthContext);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (exerciseId) {
            fetchExerciseStats(exerciseId, startDate, endDate);
        }
    }, [exerciseId, startDate, endDate]);

    const handleExerciseChange = (event, newValue) => {
        setSelectedExercise(newValue);
        setExerciseId(newValue?.id || null);
    };

    const fetchExercises = async () => {
        try {
            const response = await fetch(`${baseUrl}api/Exercise/name`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const data = await response.json();
            setExercises(data);
            setIsExercisesFetched(true);
        } catch (error) {
            console.error('Error fetching exercises:', error);
        }
    };

    const fetchExerciseStats = async (exerciseId, startDate, endDate) => {
        let url = `${baseUrl}api/Exercise/Stats?exerciseNameId=${exerciseId}`;
        if (startDate) url += `&startDate=${startDate}`;
        if (endDate) url += `&endDate=${endDate}`;
        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            const data = await response.json();
            parseChartData(data);
        } catch (error) {
            console.error('Error fetching workout details:', error);
        }
    };

    const parseChartData = (data) => {
        const dateParameterMap = new Map();

        data.forEach(entry => {
            const date = entry.dateTime.split('T')[0];
            if (!dateParameterMap.has(date)) {
                dateParameterMap.set(date, new Map());
            }
            const parametersMap = dateParameterMap.get(date);

            entry.parameters.forEach(param => {
                if (!parametersMap.has(param.name) || parametersMap.get(param.name) < param.value) {
                    parametersMap.set(param.name, param.value);
                }
            });
        });

        const parsedData = [];
        const dates = Array.from(dateParameterMap.keys()).sort();

        dates.forEach(date => {
            const parametersMap = dateParameterMap.get(date);
            parametersMap.forEach((value, name) => {
                let paramData = parsedData.find(p => p.label === name);
                if (!paramData) {
                    paramData = { label: name, data: Array(dates.length).fill(null), dates };
                    parsedData.push(paramData);
                }
                paramData.data[dates.indexOf(date)] = value;
            });
        });

        setChartData(parsedData);
    };

    return (
        <Box sx={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h6" component="h1" gutterBottom>
                Statistics
            </Typography>
            <Box sx={{ flexGrow: 1, marginTop: theme.spacing(2) }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={3}>
                        <Autocomplete
                            options={exercises}
                            getOptionLabel={(option) => option.value}
                            onChange={handleExerciseChange}
                            onOpen={() => {
                                if (!isExercisesFetched) {
                                    fetchExercises();
                                }
                            }}
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
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <TextField
                            label="Start Date"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <TextField
                            label="End Date"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={1} md={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => fetchExerciseStats(exerciseId, startDate, endDate)}
                            fullWidth
                        >
                            Apply
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {chartData.map((chart, index) => (
                <Container
                    key={index}
                    sx={{
                        width: isSmallScreen ? '100%' : '50%',
                        height: isSmallScreen ? '30vh' : '50vh',
                        padding: theme.spacing(2),
                        marginTop: theme.spacing(2),
                        display: 'inline-block',
                        minWidth: '300px',
                    }}
                >
                    <Typography variant="h6" component="h2" gutterBottom>
                        {chart.label}
                    </Typography>
                    <Line
                        data={{
                            labels: chart.dates,
                            datasets: [{
                                label: chart.label,
                                data: chart.data,
                                fill: true,
                                backgroundColor: '#f07d79',
                                borderColor: '#E43D40',
                                tension: 0.4,
                                spanGaps: true,
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    type: 'category',
                                    labels: chart.dates,
                                }
                            },
                            plugins: {
                                filler: {
                                    propagate: false
                                },
                                tooltip: {
                                    callbacks: {
                                        label: (context) => {
                                            return `${context.parsed.y}`;
                                        }
                                    }
                                }
                            }
                        }}
                    />
                </Container>
            ))}
        </Box>
    );
};

export default MyStatistics;
