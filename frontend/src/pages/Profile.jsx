import React, { useState } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Grid, Avatar, Divider, Switch, FormControlLabel, IconButton } from '@mui/material';
import { PhotoCamera, Save, Delete, Notifications, Public, Security } from '@mui/icons-material';

const Profile = () => {
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        location: 'New York, USA',
        bio: 'Avid traveler and photographer.',
        phone: '+1 (555) 123-4567'
    });

    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        publicProfile: true,
        darkMode: false,
        tripReminders: true
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handlePreferenceChange = (name) => (e) => {
        setPreferences({ ...preferences, [name]: e.target.checked });
    };

    const handleSave = () => {
        console.log('Saving profile:', user);
        // Add actual save logic here
        alert('Profile saved successfully!');
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            console.log('Deleting account');
            // Add actual delete logic here
        }
    };

    const stats = [
        { label: 'Trips Planned', value: '12', icon: '✈️' },
        { label: 'Countries Visited', value: '8', icon: '🌍' },
        { label: 'Days Traveling', value: '156', icon: '📅' },
        { label: 'Photos Taken', value: '2.5K', icon: '📸' }
    ];

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: { xs: 2, sm: 3, md: 4 },
            width: '100vw',
            margin: 0,
            overflowX: 'hidden',
            boxSizing: 'border-box'
        }}>
            {/* Animated Background Elements */}
            <Box sx={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'float 6s ease-in-out infinite',
                '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                    '50%': { transform: 'translateY(-20px) rotate(180deg)' }
                }
            }} />

            <Container maxWidth={false} sx={{ 
                maxWidth: '1400px !important',
                width: '100%',
                padding: '0 !important'
            }}>
                {/* Header */}
                <Box sx={{ 
                    textAlign: 'center', 
                    mb: { xs: 3, sm: 4, md: 5 },
                    animation: 'slideDown 0.6s ease',
                    '@keyframes slideDown': {
                        from: { opacity: 0, transform: 'translateY(-50px)' },
                        to: { opacity: 1, transform: 'translateY(0)' }
                    }
                }}>
                    <Typography variant="h1" sx={{
                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                        fontWeight: 700,
                        background: 'linear-gradient(90deg, #FFF, #FFD166)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1,
                        textShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}>
                        👤 Profile Settings
                    </Typography>
                    <Typography variant="h6" sx={{
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' },
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Manage your account and preferences
                    </Typography>
                </Box>

                {/* Main Content Container with Equal Padding */}
                <Box sx={{
                    width: '100%',
                    px: { xs: 0, sm: 2, md: 3, lg: 4, xl: 6 },
                    boxSizing: 'border-box'
                }}>
                    <Grid container spacing={3}>
                        {/* Left Column - Profile Form */}
                        <Grid item xs={12} lg={8}>
                            <Paper sx={{ 
                                p: { xs: 2, sm: 3, md: 4 }, 
                                borderRadius: 3,
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                animation: 'fadeIn 0.8s ease',
                                '@keyframes fadeIn': {
                                    from: { opacity: 0 },
                                    to: { opacity: 1 }
                                },
                                width: '100%',
                                boxSizing: 'border-box'
                            }}>
                                {/* Profile Header */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                                    <Box sx={{ position: 'relative' }}>
                                        <Avatar sx={{ 
                                            width: { xs: 80, sm: 100, md: 120 }, 
                                            height: { xs: 80, sm: 100, md: 120 }, 
                                            bgcolor: 'secondary.main', 
                                            fontSize: { xs: 30, sm: 40, md: 50 },
                                            border: '4px solid white',
                                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                                        }}>
                                            {user.name.charAt(0)}
                                        </Avatar>
                                        <IconButton 
                                            sx={{ 
                                                position: 'absolute', 
                                                bottom: 0, 
                                                right: 0,
                                                bgcolor: 'primary.main',
                                                color: 'white',
                                                '&:hover': { bgcolor: 'primary.dark' }
                                            }}
                                            component="label"
                                        >
                                            <PhotoCamera />
                                            <input hidden type="file" />
                                        </IconButton>
                                    </Box>
                                    <Box sx={{ flex: 1, width: '100%' }}>
                                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                                            {user.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            Member since January 2024
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                            <Button 
                                                variant="contained" 
                                                size="small"
                                                component="label"
                                                startIcon={<PhotoCamera />}
                                            >
                                                Change Photo
                                                <input hidden type="file" />
                                            </Button>
                                            <Button 
                                                color="error" 
                                                variant="outlined" 
                                                size="small"
                                            >
                                                Remove
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Profile Form */}
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Full Name"
                                            name="name"
                                            value={user.name}
                                            onChange={handleChange}
                                            variant="outlined"
                                            sx={{ 
                                                '& .MuiOutlinedInput-root': { 
                                                    borderRadius: 2,
                                                    background: 'white'
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Email Address"
                                            name="email"
                                            value={user.email}
                                            onChange={handleChange}
                                            variant="outlined"
                                            sx={{ 
                                                '& .MuiOutlinedInput-root': { 
                                                    borderRadius: 2,
                                                    background: 'white'
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Phone Number"
                                            name="phone"
                                            value={user.phone}
                                            onChange={handleChange}
                                            variant="outlined"
                                            sx={{ 
                                                '& .MuiOutlinedInput-root': { 
                                                    borderRadius: 2,
                                                    background: 'white'
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Location"
                                            name="location"
                                            value={user.location}
                                            onChange={handleChange}
                                            variant="outlined"
                                            sx={{ 
                                                '& .MuiOutlinedInput-root': { 
                                                    borderRadius: 2,
                                                    background: 'white'
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Bio"
                                            name="bio"
                                            multiline
                                            rows={4}
                                            value={user.bio}
                                            onChange={handleChange}
                                            variant="outlined"
                                            sx={{ 
                                                '& .MuiOutlinedInput-root': { 
                                                    borderRadius: 2,
                                                    background: 'white'
                                                }
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button 
                                        variant="contained" 
                                        size="large"
                                        startIcon={<Save />}
                                        onClick={handleSave}
                                        sx={{
                                            px: 4,
                                            py: 1.5,
                                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #5a67d8, #6a4d8c)',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
                                            },
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        Save Changes
                                    </Button>
                                </Box>
                            </Paper>

                            {/* Horizontal Layout Cards Below Form - Now inside left column */}
                            <Grid container spacing={3} sx={{ mt: 3 }}>
                                {/* Travel Stats Card */}
                                <Grid item xs={12} md={4}>
                                    <Paper sx={{ 
                                        p: 3, 
                                        borderRadius: 3,
                                        background: 'rgba(255, 255, 255, 0.95)',
                                        backdropFilter: 'blur(10px)',
                                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        height: '100%'
                                    }}>
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                                            📊 Travel Stats
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                            {stats.map((stat, index) => (
                                                <Box key={index} sx={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    p: 2,
                                                    background: 'linear-gradient(135deg, #667eea10, #764ba210)',
                                                    borderRadius: 2,
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateX(5px)',
                                                        background: 'linear-gradient(135deg, #667eea20, #764ba220)'
                                                    }
                                                }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <Typography variant="h5" sx={{ fontSize: '1.5rem' }}>
                                                            {stat.icon}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {stat.label}
                                                        </Typography>
                                                    </Box>
                                                    <Typography variant="h6" sx={{ 
                                                        fontWeight: 'bold',
                                                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent'
                                                    }}>
                                                        {stat.value}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Paper>
                                </Grid>

                                {/* Preferences Card */}
                                <Grid item xs={12} md={4}>
                                    <Paper sx={{ 
                                        p: 3, 
                                        borderRadius: 3,
                                        background: 'rgba(255, 255, 255, 0.95)',
                                        backdropFilter: 'blur(10px)',
                                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        height: '100%'
                                    }}>
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                                            ⚙️ Preferences
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                            <FormControlLabel 
                                                control={
                                                    <Switch 
                                                        checked={preferences.emailNotifications}
                                                        onChange={handlePreferenceChange('emailNotifications')}
                                                        color="primary"
                                                        size="small"
                                                    />
                                                } 
                                                label={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Notifications fontSize="small" />
                                                        <Typography variant="body2">Email Notifications</Typography>
                                                    </Box>
                                                }
                                            />
                                            <FormControlLabel 
                                                control={
                                                    <Switch 
                                                        checked={preferences.publicProfile}
                                                        onChange={handlePreferenceChange('publicProfile')}
                                                        color="primary"
                                                        size="small"
                                                    />
                                                } 
                                                label={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Public fontSize="small" />
                                                        <Typography variant="body2">Public Profile</Typography>
                                                    </Box>
                                                }
                                            />
                                            <FormControlLabel 
                                                control={
                                                    <Switch 
                                                        checked={preferences.darkMode}
                                                        onChange={handlePreferenceChange('darkMode')}
                                                        color="primary"
                                                        size="small"
                                                    />
                                                } 
                                                label={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <span style={{ fontSize: '1.2rem' }}>🌙</span>
                                                        <Typography variant="body2">Dark Mode</Typography>
                                                    </Box>
                                                }
                                            />
                                            <FormControlLabel 
                                                control={
                                                    <Switch 
                                                        checked={preferences.tripReminders}
                                                        onChange={handlePreferenceChange('tripReminders')}
                                                        color="primary"
                                                        size="small"
                                                    />
                                                } 
                                                label={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <span style={{ fontSize: '1.2rem' }}>⏰</span>
                                                        <Typography variant="body2">Trip Reminders</Typography>
                                                    </Box>
                                                }
                                            />
                                        </Box>
                                    </Paper>
                                </Grid>

                                {/* Account Security Card */}
                                <Grid item xs={12} md={4}>
                                    <Paper sx={{ 
                                        p: 3, 
                                        borderRadius: 3,
                                        background: 'rgba(255, 255, 255, 0.95)',
                                        backdropFilter: 'blur(10px)',
                                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        height: '100%'
                                    }}>
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                                            🔒 Account Security
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                            <Button 
                                                variant="outlined" 
                                                fullWidth
                                                startIcon={<Security />}
                                                sx={{ 
                                                    justifyContent: 'flex-start',
                                                    py: 1.5,
                                                    mb: 1
                                                }}
                                            >
                                                Change Password
                                            </Button>
                                            <Button 
                                                variant="outlined" 
                                                fullWidth
                                                startIcon={<Security />}
                                                sx={{ 
                                                    justifyContent: 'flex-start',
                                                    py: 1.5,
                                                    mb: 1
                                                }}
                                            >
                                                Two-Factor Auth
                                            </Button>
                                            <Button 
                                                variant="outlined" 
                                                fullWidth
                                                startIcon={<Security />}
                                                sx={{ 
                                                    justifyContent: 'flex-start',
                                                    py: 1.5,
                                                    mb: 1
                                                }}
                                            >
                                                Session History
                                            </Button>
                                            <Button 
                                                color="error" 
                                                variant="outlined"
                                                fullWidth
                                                startIcon={<Delete />}
                                                onClick={handleDeleteAccount}
                                                sx={{
                                                    justifyContent: 'flex-start',
                                                    py: 1.5,
                                                    borderColor: '#EF4444',
                                                    color: '#EF4444',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(239, 68, 68, 0.04)',
                                                        borderColor: '#DC2626'
                                                    }
                                                }}
                                            >
                                                Delete Account
                                            </Button>
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Right Column - Sidebar Cards */}
                        <Grid item xs={12} lg={4}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
                                {/* Quick Actions */}
                                <Paper sx={{ 
                                    p: 3, 
                                    borderRadius: 3,
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                    flex: 1
                                }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                                        🚀 Quick Actions
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <Button 
                                            variant="outlined" 
                                            fullWidth
                                            sx={{ 
                                                justifyContent: 'flex-start', 
                                                py: 1.5,
                                                '&:hover': {
                                                    transform: 'translateX(5px)',
                                                    background: 'linear-gradient(135deg, #667eea10, #764ba210)'
                                                },
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            📄 Export Data
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            fullWidth
                                            sx={{ 
                                                justifyContent: 'flex-start', 
                                                py: 1.5,
                                                '&:hover': {
                                                    transform: 'translateX(5px)',
                                                    background: 'linear-gradient(135deg, #667eea10, #764ba210)'
                                                },
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            👥 Manage Connections
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            fullWidth
                                            sx={{ 
                                                justifyContent: 'flex-start', 
                                                py: 1.5,
                                                '&:hover': {
                                                    transform: 'translateX(5px)',
                                                    background: 'linear-gradient(135deg, #667eea10, #764ba210)'
                                                },
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            🛡️ Privacy Settings
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            fullWidth
                                            sx={{ 
                                                justifyContent: 'flex-start', 
                                                py: 1.5,
                                                '&:hover': {
                                                    transform: 'translateX(5px)',
                                                    background: 'linear-gradient(135deg, #667eea10, #764ba210)'
                                                },
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            💳 Payment Methods
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            fullWidth
                                            sx={{ 
                                                justifyContent: 'flex-start', 
                                                py: 1.5,
                                                '&:hover': {
                                                    transform: 'translateX(5px)',
                                                    background: 'linear-gradient(135deg, #667eea10, #764ba210)'
                                                },
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            📱 App Settings
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            fullWidth
                                            sx={{ 
                                                justifyContent: 'flex-start', 
                                                py: 1.5,
                                                '&:hover': {
                                                    transform: 'translateX(5px)',
                                                    background: 'linear-gradient(135deg, #667eea10, #764ba210)'
                                                },
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            🎨 Theme Customization
                                        </Button>
                                    </Box>
                                </Paper>

                                {/* Account Info */}
                                <Paper sx={{ 
                                    p: 3, 
                                    borderRadius: 3,
                                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                    color: 'white',
                                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                                    flex: 1
                                }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                                        📝 Account Info
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                Account Type
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                Premium
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                Member Since
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                Jan 2024
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                Last Login
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                Today
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                Email Verified
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                ✅ Yes
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                Phone Verified
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                ✅ Yes
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                Storage Used
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                2.3 GB / 10 GB
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Button 
                                        variant="contained" 
                                        fullWidth
                                        sx={{ 
                                            mt: 3,
                                            background: 'white',
                                            color: '#667eea',
                                            fontWeight: 'bold',
                                            '&:hover': {
                                                background: 'rgba(255, 255, 255, 0.9)',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
                                            },
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        Upgrade Plan
                                    </Button>
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>

            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                    
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    
                    body {
                        font-family: 'Poppins', sans-serif;
                        margin: 0;
                        overflow-x: hidden;
                        width: 100vw;
                    }
                    
                    ::-webkit-scrollbar {
                        width: 8px;
                    }
                    
                    ::-webkit-scrollbar-track {
                        background: rgba(0,0,0,0.1);
                        border-radius: 10px;
                    }
                    
                    ::-webkit-scrollbar-thumb {
                        background: #667eea;
                        border-radius: 10px;
                    }
                    
                    ::-webkit-scrollbar-thumb:hover {
                        background: #764ba2;
                    }
                    
                    /* Responsive Styles */
                    @media (max-width: 1200px) {
                        .main-content-container {
                            padding-left: 2vw !important;
                            padding-right: 2vw !important;
                        }
                    }
                    
                    @media (max-width: 900px) {
                        .MuiGrid-container {
                            gap: 16px !important;
                        }
                        
                        .horizontal-cards-container {
                            gridTemplateColumns: 1fr !important;
                        }
                    }
                    
                    @media (max-width: 600px) {
                        .MuiContainer-root {
                            padding-left: 8px !important;
                            padding-right: 8px !important;
                        }
                        
                        .MuiPaper-root {
                            padding: 16px !important;
                        }
                    }
                    
                    @media (max-width: 400px) {
                        .MuiTypography-h1 {
                            font-size: 1.6rem !important;
                        }
                        
                        .MuiTypography-h6 {
                            font-size: 0.9rem !important;
                        }
                        
                        .MuiButton-root {
                            font-size: 0.8rem !important;
                            padding: 8px 16px !important;
                        }
                    }
                `}
            </style>
        </Box>
    );
};

export default Profile;