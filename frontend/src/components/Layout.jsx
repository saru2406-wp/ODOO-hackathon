import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useNavigate, Outlet } from 'react-router-dom';

const Layout = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider' }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        <FlightTakeoffIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'primary.main' }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            onClick={() => navigate('/dashboard')}
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'primary.main',
                                textDecoration: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            GLOBETROTTER
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button onClick={() => navigate('/dashboard')} sx={{ color: 'text.primary' }}>Dashboard</Button>
                            <Button onClick={() => navigate('/trips')} sx={{ color: 'text.primary' }}>My Trips</Button>
                            <Button onClick={() => navigate('/profile')} sx={{ color: 'text.primary' }}>Profile</Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate('/login')}
                                sx={{ ml: 2, borderRadius: 10, px: 3 }}
                            >
                                Sign Out
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
                <Outlet />
            </Box>

            <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'white', borderTop: '1px solid', borderColor: 'divider' }}>
                <Container maxWidth="lg">
                    <Typography variant="body2" color="text.secondary" align="center">
                        {'Copyright © '}
                        <Link color="inherit" href="#">
                            GlobeTrotter
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Layout;
