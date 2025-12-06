import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

const getIcon = (severity) => {
  switch (severity) {
    case 'success':
      return <CheckCircleIcon />;
    case 'error':
      return <ErrorIcon />;
    case 'warning':
      return <WarningIcon />;
    case 'info':
      return <InfoIcon />;
    default:
      return null;
  }
};

const getSeverityColor = (severity) => {
  switch (severity) {
    case 'success':
      return '#4caf50';
    case 'error':
      return '#f44336';
    case 'warning':
      return '#ff9800';
    case 'info':
      return '#2196f3';
    default:
      return '#000';
  }
};

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info',
    autoHideDuration: 6000,
  });

  const showNotification = (message, severity = 'info', autoHideDuration = 6000) => {
    setNotification({
      open: true,
      message,
      severity,
      autoHideDuration,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      <Snackbar
        open={notification.open}
        autoHideDuration={notification.autoHideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        TransitionComponent={Slide}
        sx={{
          '& .MuiSnackbar-root': {
            bottom: { xs: 16, sm: 24 },
            left: { xs: 16, sm: 24 },
            right: { xs: 16, sm: 24 },
          },
        }}
      >
        <Alert
          onClose={handleClose}
          severity={notification.severity}
          variant="filled"
          icon={getIcon(notification.severity)}
          sx={{
            width: '100%',
            fontSize: { xs: '0.875rem', sm: '1rem' },
            '& .MuiAlert-icon': {
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            },
            '& .MuiAlert-message': {
              fontSize: { xs: '0.875rem', sm: '1rem' },
            },
            '& .MuiAlert-action': {
              paddingTop: 0,
            },
          }}
          action={
            <button
              onClick={handleClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1.5rem',
                padding: '4px',
                marginLeft: '8px',
              }}
              aria-label="Закрыть уведомление"
            >
              ×
            </button>
          }
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};