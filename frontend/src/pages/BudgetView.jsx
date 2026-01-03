import React from 'react';
import { Box, Container, Grid, Paper, Typography, LinearProgress, Divider, List, ListItem, ListItemText } from '@mui/material';
import PieChartIcon from '@mui/icons-material/PieChart';

const BudgetView = () => {
    // Mock budget data
    const totalBudget = 2000;
    const spent = 1250;
    const progress = (spent / totalBudget) * 100;

    const categories = [
        { name: 'Accommodation', amount: 800, color: 'primary.main' },
        { name: 'Flights / Transport', amount: 300, color: 'secondary.main' },
        { name: 'Food & Dining', amount: 250, color: 'success.main' },
        { name: 'Activities', amount: 150, color: 'warning.main' },
    ];

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 4, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <PieChartIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        Trip Budget
                    </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle1">Total Spent: €{spent}</Typography>
                        <Typography variant="subtitle1">Budget: €{totalBudget}</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5 }} />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                        {100 - progress}% remaining
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {/* Expense Breakdown List */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>Breakdown by Category</Typography>
                        <List>
                            {categories.map((cat) => (
                                <ListItem key={cat.name} sx={{ px: 0 }}>
                                    <ListItemText primary={cat.name} secondary={`€${cat.amount}`} />
                                    <Typography variant="body2" sx={{ color: cat.color, fontWeight: 'bold' }}>
                                        {Math.round((cat.amount / spent) * 100)}%
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    {/* Placeholder for Chart */}
                    <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ width: 200, height: 200, borderRadius: '50%', border: '20px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                            {/* Simplistic visual representation of a chart */}
                            <Typography variant="body2" color="text.secondary">Chart Placeholder</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default BudgetView;
