import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Container, Grid } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { useAuthContext } from "../../hooks/useAuthContext"; 

import { baseUrl } from "../../shared";

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

const Profile = () => {
  const [username, setUsername] = useState("");
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [weightHistory, setWeightHistory] = useState([]);
  const [bodyFatHistory, setBodyFatHistory] = useState([]);
  const [currentStats, setCurrentStats] = useState({ weightKilograms: 0, bodyFatPercentage: 0 });
  const { user } = useAuthContext();
  
  useEffect(() => {
    fetchCurrentStats();
    fetchWeightHistory();
    fetchBodyFatHistory();
    fetchUsername();
  }, []);

  const fetchCurrentStats = async () => {
    try {
      const response = await fetch(`${baseUrl}api/User/PersonalStats`, {
        headers: {
            Authorization: `Bearer ${user.accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentStats(data);
      } else {
        console.error("Error fetching current stats:", response.status);
      }
    } catch (error) {
      console.error("Error fetching current stats:", error);
    }
  };

  const fetchWeightHistory = async () => {
    try {
      const response = await fetch(`${baseUrl}api/User/WeightHistory`, {
        headers: {
            Authorization: `Bearer ${user.accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setWeightHistory(data);
      } else {
        console.error("Error fetching weight history:", response.status);
      }
    } catch (error) {
      console.error("Error fetching weight history:", error);
    }
  };

  const fetchBodyFatHistory = async () => {
    try {
      const response = await fetch(`${baseUrl}api/User/BodyFatPercentageHistory`, {
        headers: {
            Authorization: `Bearer ${user.accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBodyFatHistory(data);
      } else {
        console.error("Error fetching body fat history:", response.status);
      }
    } catch (error) {
      console.error("Error fetching body fat history:", error);
    }
  };

  const fetchUsername = async () => {
    try {
      const response = await fetch(`${baseUrl}api/User/Username`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.text();
        setUsername(data);
      } else {
        console.error("Error fetching username:", response.status);
      }
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}api/User/Username`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({ username }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Username submitted:", data);
      } else {
        console.error("Error submitting username:", response.status);
      }
    } catch (error) {
      console.error("Error submitting username:", error);
    }
  };

  const handlePersonalSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}api/User/PersonalStats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({
          weightKg: weight,
          bodyFatPercentage: bodyFat,
        }),
      });
      
        const data = await response.json();
        console.log("Personal stats submitted:", data);
        fetchCurrentStats();
        fetchWeightHistory();
        fetchBodyFatHistory();
      
    } catch (error) {
      console.error("Error submitting personal stats:", error);
    }
  };

  const parseChartData = (data, label) => {
    const dates = data.map((entry) => entry.measurementDate.split("T")[0]);
    const values = data.map((entry) => entry[label]);
    return { dates, values };
  };

  const weightChartData = parseChartData(weightHistory, "weightKilograms");
  const bodyFatChartData = parseChartData(bodyFatHistory, "bodyfatPercentage");

  return (
    <Box sx={{ width: "80%", margin: "20vh auto" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Hello {username}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <form onSubmit={handleUsernameSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button variant="contained" type="submit" sx={{ mt: 2 }}>
              Change
            </Button>
          </form>
          <form onSubmit={handlePersonalSubmit}>
            <TextField
              label="Weight (kg)"
              variant="outlined"
              fullWidth
              margin="normal"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <TextField
              label="Body Fat %"
              variant="outlined"
              fullWidth
              margin="normal"
              value={bodyFat}
              onChange={(e) => setBodyFat(e.target.value)}
            />
            <Button variant="contained" type="submit" sx={{ mt: 2 }}>
              Submit
            </Button>
          </form>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Current Stats</Typography>
            <Typography>Weight: {currentStats.weightKilograms} kg</Typography>
            <Typography>Body Fat: {currentStats.bodyFatPercentage} %</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Container sx={{ height: "400px", mt: 4 }}>
            <Typography variant="h6">Weight History</Typography>
            <Line
              data={{
                labels: weightChartData.dates,
                datasets: [
                  {
                    label: "Weight (kg)",
                    data: weightChartData.values,
                    fill: true,
                    backgroundColor: '#f07d79',
                    borderColor: '#E43D40',
                    tension: 0.4,
                    spanGaps: true,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    type: "category",
                    labels: weightChartData.dates,
                  },
                },
                plugins: {
                  filler: {
                    propagate: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        return `${context.parsed.y}`;
                      },
                    },
                  },
                },
              }}
            />
          </Container>
          <Container sx={{ height: "400px", mt: 4 }}>
            <Typography variant="h6">Body Fat Percentage History</Typography>
            <Line
              data={{
                labels: bodyFatChartData.dates,
                datasets: [
                  {
                    label: "Body Fat (%)",
                    data: bodyFatChartData.values,
                    fill: true,
                    backgroundColor: '#f07d79',
                    borderColor: '#E43D40',
                    tension: 0.4,
                    spanGaps: true,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    type: "category",
                    labels: bodyFatChartData.dates,
                  },
                },
                plugins: {
                  filler: {
                    propagate: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        return `${context.parsed.y}`;
                      },
                    },
                  },
                },
              }}
            />
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
