import React from 'react';
import { Box, Container, Grid, Paper, Typography, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg">
            <Grid container spacing={4}>
                {/* Welcome Banner */}
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 6,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, #5e60ceff 0%, #967aa1ff 100%)', // slate-blue to dusty-mauve
                            color: 'white',
                            borderRadius: 4,
                            boxShadow: 3,
                        }}
                    >
                        <Typography component="h1" variant="h3" fontWeight="bold" gutterBottom>
                            Welcome back, Traveler!
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 4, maxWidth: '600px', opacity: 0.9 }}>
                            Your next adventure awaits. Explore new destinations or continue planning your upcoming trips.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/trips/new')}
                            sx={{
                                bgcolor: 'white',
                                color: 'primary.main',
                                fontWeight: 'bold',
                                '&:hover': { bgcolor: 'grey.100' }
                            }}
                        >
                            Plan New Trip
                        </Button>
                    </Paper>
                </Grid>

                {/* Recent Trips Header */}
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="h5" fontWeight="bold" color="text.primary">
                        Your Recent Trips
                    </Typography>
                    <Button color="secondary" onClick={() => navigate('/trips')}>View All</Button>
                </Grid>

                {/* Trip Cards */}
                {[1, 2, 3].map((trip) => (
                    <Grid item xs={12} md={4} key={trip}>
                        <Paper
                            sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                minHeight: 220,
                                justifyContent: 'space-between',
                                borderRadius: 4,
                                position: 'relative',
                                overflow: 'hidden',
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Box>
                                <Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>
                                    Trip to Paris #{trip}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    📅 Jan 10 - Jan 20
                                </Typography>
                            </Box>

                            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="outlined" size="small" onClick={() => navigate(`/itinerary/1`)}>
                                    View Details
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Dashboard;
