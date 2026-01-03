import React, { useState } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Grid, Avatar, Divider, Switch, FormControlLabel } from '@mui/material';

const Profile = () => {
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        location: 'New York, USA',
        bio: 'Avid traveler and photographer.'
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Profile Settings
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Avatar sx={{ width: 100, height: 100, bgcolor: 'secondary.main', fontSize: 40, mr: 3 }}>
                        {user.name.charAt(0)}
                    </Avatar>
                    <Box>
                        <Button variant="outlined" component="label" sx={{ mr: 2 }}>
                            Change Photo
                            <input hidden type="file" />
                        </Button>
                        <Button color="error">Remove</Button>
                    </Box>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Location"
                            name="location"
                            value={user.location}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Bio"
                            name="bio"
                            multiline
                            rows={3}
                            value={user.bio}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" size="large">
                        Save Changes
                    </Button>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h6" gutterBottom>Preferences</Typography>
                <Box>
                    <FormControlLabel control={<Switch defaultChecked />} label="Email Notifications" />
                </Box>
                <Box>
                    <FormControlLabel control={<Switch defaultChecked />} label="Public Profile" />
                </Box>

                <Divider sx={{ my: 4 }} />

                <Button color="error" variant="outlined">
                    Delete Account
                </Button>
            </Paper>
        </Container>
    );
};

export default Profile;
