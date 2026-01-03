import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Typography, Button, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HotelIcon from '@mui/icons-material/Hotel';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate, useParams } from 'react-router-dom';

const ItineraryBuilder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [days, setDays] = useState([
        {
            day: 1, date: '2025-06-15', city: 'Rome', activities: [
                { id: 101, type: 'sightseeing', name: 'Colosseum', time: '09:00 AM', cost: '€20' },
                { id: 102, type: 'food', name: 'Lunch at Trattoria', time: '01:00 PM', cost: '€30' },
            ]
        },
        {
            day: 2, date: '2025-06-16', city: 'Rome', activities: [
                { id: 201, type: 'sightseeing', name: 'Vatican Museums', time: '10:00 AM', cost: '€25' },
            ]
        },
    ]);

    const getActivityIcon = (type) => {
        switch (type) {
            case 'sightseeing': return <DirectionsWalkIcon />;
            case 'food': return <RestaurantIcon />;
            case 'stay': return <HotelIcon />;
            default: return <LocationOnIcon />;
        }
    };

    return (
        <Container maxWidth="lg">
            {/* Header Section */}
            <Paper sx={{ p: 4, mb: 4, borderRadius: 4, bgcolor: 'background.paper', position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <Typography variant="overline" color="secondary.main" fontWeight="bold">
                            Upcoming Trip
                        </Typography>
                        <Typography variant="h3" fontWeight="bold" color="text.primary" sx={{ mb: 1 }}>
                            Trip to Italy
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CalendarMonthIcon fontSize="small" /> Jun 15 - Jun 30, 2025
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="outlined" startIcon={<CalendarMonthIcon />} onClick={() => navigate(`/calendar/${id}`)}>
                            Calendar
                        </Button>
                        <Button variant="contained" startIcon={<ShareIcon />} color="primary" onClick={() => navigate(`/public/${id}`)}>
                            Share
                        </Button>
                    </Box>
                </Box>
                {/* Decorative background element */}
                <Box sx={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', bgcolor: 'custom.lavenderBlush', opacity: 0.5 }} />
            </Paper>

            <Grid container spacing={4}>
                {/* Itinerary Timeline (Left Column) */}
                <Grid item xs={12} md={8}>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                        Daily Plan
                    </Typography>

                    {days.map((dayData, index) => (
                        <Paper key={index} sx={{ mb: 4, p: 0, borderRadius: 4, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                            <Box sx={{ bgcolor: 'secondary.light', p: 2, px: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'secondary.contrastText' }}>
                                <Typography variant="h6" fontWeight="bold">
                                    Day {dayData.day} &mdash; {dayData.city}
                                </Typography>
                                <Typography variant="body2" fontWeight="medium">
                                    {dayData.date}
                                </Typography>
                            </Box>

                            <Box sx={{ p: 3 }}>
                                <List disablePadding>
                                    {dayData.activities.map((activity, idx) => (
                                        <React.Fragment key={activity.id}>
                                            {idx > 0 && <Divider variant="inset" component="li" />}
                                            <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                                                <ListItemAvatar>
                                                    <Avatar sx={{ bgcolor: 'primary.light', color: 'white' }}>
                                                        {getActivityIcon(activity.type)}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                                                            {activity.name}
                                                        </Typography>
                                                    }
                                                    secondary={
                                                        <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {activity.time}
                                                            </Typography>
                                                            <Chip label={`Est. ${activity.cost}`} size="small" variant="outlined" sx={{ borderColor: 'divider', height: 20, fontSize: '0.7rem' }} />
                                                        </Box>
                                                    }
                                                />
                                                <Tooltip title="Activity Type">
                                                    <Chip label={activity.type} size="small" color="secondary" sx={{ opacity: 0.8 }} />
                                                </Tooltip>
                                            </ListItem>
                                        </React.Fragment>
                                    ))}
                                </List>

                                <Button
                                    startIcon={<AddIcon />}
                                    fullWidth
                                    variant="outlined"
                                    sx={{ mt: 2, borderStyle: 'dashed', borderWidth: 2, '&:hover': { borderWidth: 2 } }}
                                    onClick={() => navigate('/search/activities')}
                                >
                                    Add Activity
                                </Button>
                            </Box>
                        </Paper>
                    ))}

                    <Button startIcon={<AddIcon />} size="large" fullWidth variant="contained" color="secondary" sx={{ py: 2, borderRadius: 3, fontSize: '1.1rem' }}>
                        Add Another Day / Stop
                    </Button>
                </Grid>

                {/* Sidebar Tools (Right Column) */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ position: 'sticky', top: 100 }}>
                        <Paper sx={{ p: 3, borderRadius: 4, mb: 3, bgcolor: 'primary.dark', color: 'white' }}>
                            <Typography variant="h6" gutterBottom color="inherit" sx={{ opacity: 0.9 }}>Trip Budget</Typography>
                            <Typography variant="h3" fontWeight="bold" color="inherit">€1,250</Typography>
                            <Typography variant="body2" color="inherit" sx={{ opacity: 0.7, mb: 2 }}>Estimated Total Cost</Typography>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => navigate(`/budget/${id}`)}
                                sx={{ bgcolor: 'white', color: 'primary.dark', '&:hover': { bgcolor: 'grey.100' } }}
                            >
                                View Breakdown
                            </Button>
                        </Paper>

                        <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                            <Typography variant="h6" gutterBottom fontWeight="bold">Explore</Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                Looking for inspiration? Discover top-rated spots nearby.
                            </Typography>
                            <Button fullWidth variant="contained" color="primary" sx={{ mb: 2 }} startIcon={<LocationOnIcon />} onClick={() => navigate('/search/cities')}>
                                Find Cities
                            </Button>
                            <Button fullWidth variant="outlined" startIcon={<DirectionsWalkIcon />} onClick={() => navigate('/search/activities')}>
                                Browse Activities
                            </Button>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ItineraryBuilder;
