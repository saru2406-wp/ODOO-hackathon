import React from 'react';
import { Box, Container, Paper, Typography, Button, IconButton, Avatar, Chip, Stack } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const PublicItinerary = () => {
    // Mock public data
    const trip = {
        name: 'Ultimate Italy Road Trip',
        author: 'Sarah Jenkins',
        days: 14,
        stops: ['Rome', 'Florence', 'Venice', 'Milan'],
        description: 'A two-week journey through the heart of Italy, experiencing the best food, art, and landscapes.',
        image: 'https://source.unsplash.com/random?italy,landscape'
    };

    return (
        <Box>
            {/* Hero Section */}
            <Box sx={{
                height: 400,
                backgroundImage: `url(${trip.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end'
            }}>
                <Box sx={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
                }} />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pb: 6, color: 'white' }}>
                    <Typography variant="h2" fontWeight="bold">{trip.name}</Typography>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>S</Avatar>
                        <Typography variant="h6">By {trip.author}</Typography>
                        <Chip label={`${trip.days} Days`} color="primary" />
                    </Stack>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 4, mb: 4 }}>
                            <Typography variant="h5" gutterBottom>About this Trip</Typography>
                            <Typography paragraph>{trip.description}</Typography>
                            <Box sx={{ mt: 2 }}>
                                {trip.stops.map((stop) => (
                                    <Chip key={stop} label={stop} sx={{ mr: 1, mb: 1 }} variant="outlined" />
                                ))}
                            </Box>
                        </Paper>
                        {/* Placeholder for timeline preview */}
                        <Typography variant="h5" gutterBottom>Itinerary Preview</Typography>
                        <Paper sx={{ p: 4, bgcolor: 'background.default' }}>
                            <Typography color="text.secondary" align="center">Detailed timeline content...</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
                            <Button fullWidth variant="contained" size="large" startIcon={<ContentCopyIcon />} sx={{ mb: 2 }}>
                                Copy to My Trips
                            </Button>
                            <Button fullWidth variant="outlined" startIcon={<ShareIcon />} sx={{ mb: 1 }}>
                                Share
                            </Button>
                            <Button fullWidth variant="text" startIcon={<FavoriteBorderIcon />}>
                                Save for Later
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

// Need to import Grid since we used it
import { Grid } from '@mui/material';

export default PublicItinerary;
