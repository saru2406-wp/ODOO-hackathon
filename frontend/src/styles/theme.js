// src/styles/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#5e60ceff', // slate-blue (Primary actions)
            light: '#6930c3ff',
            dark: '#192a51ff',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#967aa1ff', // dusty-mauve (Secondary actions)
            light: '#d5c6e0ff', // thistle
            dark: '#7400b8ff',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f8f9fa', // Clean light grey/white background
            paper: '#ffffff', // White cards
        },
        text: {
            primary: '#192a51ff', // space-indigo (Dark text for readability)
            secondary: '#5e60ceff', // slate-blue (Subtitles)
        },
        custom: {
            lavenderBlush: '#f5e6e8ff',
            pastelBlue: '#4ea8deff',
            pastelGreen: '#80ffdbff',
        },
    },
    typography: {
        fontFamily: 'Inter, sans-serif',
        h1: { fontWeight: 700, color: '#192a51ff' },
        h2: { fontWeight: 700, color: '#192a51ff' },
        h4: { fontWeight: 600, color: '#192a51ff' },
        h5: { fontWeight: 600, color: '#192a51ff' },
        h6: { fontWeight: 600, color: '#192a51ff' },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)', // Soft shadow
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    },
                },
            },
        },
    },
});

export default theme;
