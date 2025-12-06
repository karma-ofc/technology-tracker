import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useLocalStorage from '../hooks/useLocalStorage';
import { useTheme as useMuiTheme } from '@mui/material/styles';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        },
      },
    },
  },
});

export const ThemeProviderWrapper = ({ children }) => {
  const [themeMode, setThemeMode] = useLocalStorage('themeMode', 'light');

  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.style.setProperty('--modal-bg', '#1e1e1e');
      root.style.setProperty('--text-color', '#ffffff');
      root.style.setProperty('--bg-color', '#121212');
      root.style.setProperty('--card-bg', '#1e1e1e');
      root.style.setProperty('--nav-bg', '#1a1a1a');
      root.style.setProperty('--nav-text', '#ffffff');
      root.style.setProperty('--border-color', '#555');
      root.style.setProperty('--hover-bg', '#333');
      root.style.setProperty('--modal-overlay', 'rgba(0, 0, 0, 0.7)');
      root.style.setProperty('--btn-primary-bg', '#90caf9');
      root.style.setProperty('--btn-primary-hover', '#64b5f6');
      root.style.setProperty('--btn-secondary-bg', '#555');
      root.style.setProperty('--btn-secondary-hover', '#777');
      root.style.setProperty('--accent-color', '#90caf9');
    } else {
      root.style.setProperty('--modal-bg', '#ffffff');
      root.style.setProperty('--text-color', '#000000');
      root.style.setProperty('--bg-color', '#f5f5f5');
      root.style.setProperty('--card-bg', '#ffffff');
      root.style.setProperty('--nav-bg', '#2c3e50');
      root.style.setProperty('--nav-text', '#ecf0f1');
      root.style.setProperty('--border-color', '#ddd');
      root.style.setProperty('--hover-bg', '#34495e');
      root.style.setProperty('--modal-overlay', 'rgba(0, 0, 0, 0.5)');
      root.style.setProperty('--btn-primary-bg', '#667eea');
      root.style.setProperty('--btn-primary-hover', '#5a6fd8');
      root.style.setProperty('--btn-secondary-bg', '#6c757d');
      root.style.setProperty('--btn-secondary-hover', '#545b62');
      root.style.setProperty('--accent-color', '#667eea');
    }
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};