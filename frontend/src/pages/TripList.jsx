import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

const TripList = () => {
    const navigate = useNavigate();

    const trips = [
        { id: 1, name: 'Summer in Italy', dates: 'Jun 15 - Jun 30, 2025', count: '3 Cities', image: 'https://source.unsplash.com/random?italy' },
        { id: 2, name: 'Weekend in Paris', dates: 'May 10 - May 12, 2025', count: '1 City', image: 'https://source.unsplash.com/random?paris' },
        { id: 3, name: 'Tokyo Adventure', dates: 'Oct 01 - Oct 14, 2025', count: '4 Cities', image: 'https://source.unsplash.com/random?tokyo' },
    ];

    return (
        <Container maxWidth="lg">
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold" color="text.primary">
                        My Adventures
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your upcoming and past trips
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    size="large"
                    onClick={() => navigate('/trips/new')}
                    sx={{ borderRadius: 8, px: 3 }}
                >
                    Create New Trip
                </Button>
            </Box>

            {trips.length === 0 ? (
                <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 4, bgcolor: 'background.paper' }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No trips found. Start your journey today!
                    </Typography>
                    <Button variant="outlined" onClick={() => navigate('/trips/new')}>Plan a Trip</Button>
                </Paper>
            ) : (
                <Grid container spacing={4}>
                    {trips.map((trip) => (
                        <Grid item xs={12} sm={6} md={4} key={trip.id}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={trip.image}
                                    alt={trip.name}
                                    sx={{ filter: 'brightness(0.95)' }}
                                />
                                <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
                                    <Chip label="Upcoming" size="small" color="primary" sx={{ bgcolor: 'rgba(255,255,255,0.9)', color: 'primary.main', fontWeight: 'bold' }} />
                                </Box>

                                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                                    <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
                                        {trip.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        📅 {trip.dates}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        📍 {trip.count}
                                    </Typography>
                                </CardContent>

                                <CardActions sx={{ px: 2, pb: 2, pt: 0, justifyContent: 'space-between' }}>
                                    <Button size="small" startIcon={<VisibilityIcon />} onClick={() => navigate(`/itinerary/${trip.id}`)}>
                                        View
                                    </Button>
                                    <Box>
                                        <IconButton size="small" onClick={() => navigate(`/itinerary/${trip.id}`)}><EditIcon fontSize="small" /></IconButton>
                                        <IconButton size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
                                    </Box>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default TripList;
