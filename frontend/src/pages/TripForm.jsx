import React, { useState } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Grid, Divider } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useNavigate } from 'react-router-dom';

const TripForm = () => {
    const navigate = useNavigate();
    const [tripData, setTripData] = useState({ name: '', startDate: '', endDate: '', description: '' });

    const handleChange = (e) => {
        setTripData({ ...tripData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Creating trip:', tripData);
        navigate('/trips');
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
                    Plan a New Adventure
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Fill in the details below to start organized planning for your next journey.
                </Typography>
            </Box>

            <Paper
                elevation={0}
                sx={{
                    p: 5,
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper'
                }}
            >
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={4}>
                        {/* Header Section */}
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                <Box sx={{ p: 1.5, bgcolor: 'primary.light', borderRadius: 2, color: 'white' }}>
                                    <FlightTakeoffIcon />
                                </Box>
                                <Typography variant="h6" fontWeight="bold">Trip Basics</Typography>
                            </Box>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="name"
                                label="Trip Name"
                                name="name"
                                placeholder="e.g. Summer in Italy"
                                variant="outlined"
                                value={tripData.name}
                                onChange={handleChange}
                                InputProps={{ sx: { borderRadius: 2 } }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="startDate"
                                label="Start Date"
                                name="startDate"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={tripData.startDate}
                                onChange={handleChange}
                                InputProps={{ sx: { borderRadius: 2 } }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="endDate"
                                label="End Date"
                                name="endDate"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={tripData.endDate}
                                onChange={handleChange}
                                InputProps={{ sx: { borderRadius: 2 } }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="description"
                                label="Description & Notes"
                                name="description"
                                multiline
                                rows={4}
                                placeholder="What are you excited about? Any must-visit spots?"
                                value={tripData.description}
                                onChange={handleChange}
                                InputProps={{ sx: { borderRadius: 2 } }}
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 5, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button
                            variant="text"
                            color="inherit"
                            onClick={() => navigate('/dashboard')}
                            sx={{ px: 3 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{ borderRadius: 8, px: 5, fontSize: '1.05rem' }}
                        >
                            Create Trip
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default TripForm;
