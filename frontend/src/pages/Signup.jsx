import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        console.log('Signing up with', formData);
        navigate('/dashboard');
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper elevation={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)' }}>
                <Typography component="h1" variant="h5" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
                    GlobeTrotter
                </Typography>
                <Typography component="h2" variant="h6" sx={{ mb: 3 }}>
                    Create Account
                </Typography>
                <Box component="form" onSubmit={handleSignup} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        autoFocus
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: 'primary.main', color: 'secondary.contrastText' }}
                    >
                        Sign Up
                    </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Link href="/login" variant="body2" sx={{ color: 'secondary.main' }}>
                            {"Already have an account? Sign In"}
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Signup;
