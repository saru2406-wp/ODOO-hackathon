import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Typography, TextField, Button, InputAdornment, Card, CardMedia, CardContent, CardActions, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';

const CitySearch = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // Mock cities
    const cities = [
        { id: 1, name: 'Florence', country: 'Italy', image: 'https://source.unsplash.com/random?florence', cost: '$$' },
        { id: 2, name: 'Kyoto', country: 'Japan', image: 'https://source.unsplash.com/random?kyoto', cost: '$$$' },
        { id: 3, name: 'Barcelona', country: 'Spain', image: 'https://source.unsplash.com/random?barcelona', cost: '$$' },
        { id: 4, name: 'Cape Town', country: 'South Africa', image: 'https://source.unsplash.com/random?capetown', cost: '$' },
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Discover Destinations
            </Typography>

            {/* Search & Filter Bar */}
            <Paper sx={{ p: 2, mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search for a city, country, or region..."
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
                {cities.map((city) => (
                    <Grid item key={city.id} xs={12} sm={6} md={3}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
                            <CardMedia
                                component="div"
                                sx={{ pt: '75%' }}
                                image={city.image}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="h6" component="div">
                                        {city.name}
                                    </Typography>
                                    <Chip label={city.cost} size="small" color="secondary" variant="outlined" />
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    {city.country}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ p: 2, pt: 0 }}>
                                <Button fullWidth variant="contained" startIcon={<AddIcon />} onClick={() => navigate(-1)}>
                                    Add to Trip
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CitySearch;
