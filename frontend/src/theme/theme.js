import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a2a3a',
      dark: '#0f1a24',
      light: '#2c3e50',
    },
    secondary: {
      main: '#f59e0b',
      dark: '#d97706',
      light: '#fbbf24',
    },
    background: {
      default: '#f0f4f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a2a3a',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '32px',
      fontWeight: 700,
      color: '#1a2a3a',
    },
    h2: {
      fontSize: '20px',
      fontWeight: 600,
      color: '#f59e0b',
    },
    h3: {
      fontSize: '18px',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 20px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: '#fcfcfc',
            '&:hover fieldset': {
              borderColor: '#1a2a3a',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1a2a3a',
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '15px',
          padding: '8px',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#f9fafb',
          '& .MuiTableCell-head': {
            fontWeight: 700,
            color: '#1a2a3a',
            borderBottom: '1px solid #e2e8f0',
            borderRight: '1px solid #e2e8f0',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #e2e8f0',
          borderRight: '1px solid #e2e8f0',
          padding: '12px 16px',
        },
      },
    },
  },
});

export default theme;
