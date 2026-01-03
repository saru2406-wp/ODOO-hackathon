import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Typography, TextField, Button, InputAdornment, Card, CardMedia, CardContent, CardActions, Chip, Rating } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';

const ActivitySearch = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // Mock activities
    const activities = [
        { id: 101, name: 'Colosseum Guided Tour', type: 'Sightseeing', rating: 4.8, reviews: 1200, price: '€35', image: 'https://source.unsplash.com/random?colosseum' },
        { id: 102, name: 'Pizza Making Class', type: 'Food & Drink', rating: 4.9, reviews: 850, price: '€60', image: 'https://source.unsplash.com/random?pizza' },
        { id: 103, name: 'Vatican Museums Skip-the-Line', type: 'Sightseeing', rating: 4.7, reviews: 3000, price: '€45', image: 'https://source.unsplash.com/random?vatican' },
        { id: 104, name: 'Trastevere Food Tour', type: 'Food & Drink', rating: 4.8, reviews: 500, price: '€80', image: 'https://source.unsplash.com/random?pasta' },
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Find Things to Do
            </Typography>

            {/* Search & Filter Bar */}
            <Paper sx={{ p: 2, mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search for activities, tours, or experiences..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant="outlined" startIcon={<FilterListIcon />} sx={{ height: '56px', minWidth: '120px' }}>
                    Filters
                </Button>
            </Paper>

            {/* Results Grid */}
            <Grid container spacing={3}>
                {activities.map((activity) => (
                    <Grid item key={activity.id} xs={12} sm={6} md={3}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
                            <CardMedia
                                component="div"
                                sx={{ pt: '75%' }}
                                image={activity.image}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h6" component="div" noWrap>
                                    {activity.name}
                                </Typography>
                                <Chip label={activity.type} size="small" sx={{ mb: 1, mr: 1 }} />
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Rating value={activity.rating} readOnly size="small" precision={0.1} />
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                        ({activity.reviews})
                                    </Typography>
                                </Box>
                                <Typography variant="h6" color="primary.main">
                                    {activity.price}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ p: 2, pt: 0 }}>
                                <Button fullWidth variant="contained" startIcon={<AddIcon />} onClick={() => navigate(-1)}>
                                    Add
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ActivitySearch;
