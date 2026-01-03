import React from 'react';
import { Box, Container, Paper, Typography, Grid } from '@mui/material';

const CalendarView = () => {
    // Mock calendar days
    const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
    const events = {
        15: 'Rome Arrival',
        16: 'Colosseum',
        18: 'Train to Florence',
        20: 'Uffizi Gallery',
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                June 2025
            </Typography>
            <Paper sx={{ p: 2 }}>
                <Grid container spacing={1}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <Grid item xs={12 / 7} key={day} sx={{ textAlign: 'center', fontWeight: 'bold', py: 1 }}>
                            {day}
                        </Grid>
                    ))}
                    {calendarDays.map((day) => (
                        <Grid item xs={12 / 7} key={day}>
                            <Box sx={{
                                height: 100,
                                border: '1px solid #eee',
                                p: 1,
                                bgcolor: events[day] ? 'primary.light' : 'background.paper',
                                color: events[day] ? 'primary.contrastText' : 'text.primary',
                                borderRadius: 1
                            }}>
                                <Typography variant="body2" fontWeight="bold">{day}</Typography>
                                {events[day] && (
                                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                        {events[day]}
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    );
};

export default CalendarView;
