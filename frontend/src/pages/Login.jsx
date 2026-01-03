import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Placeholder login logic
        console.log('Logging in with', email, password);
        navigate('/dashboard');
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper elevation={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)' }}>
                <Typography component="h1" variant="h5" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
                    GlobeTrotter
                </Typography>
                <Typography component="h2" variant="h6" sx={{ mb: 3 }}>
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: 'primary.main', color: 'secondary.contrastText' }}
                    >
                        Sign In
                    </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Link href="#" variant="body2" sx={{ color: 'secondary.main' }}>
                            Forgot password?
                        </Link>
                        <Link href="/signup" variant="body2" sx={{ color: 'secondary.main' }}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
