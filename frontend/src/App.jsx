import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login';
import DashboardPage from './pages/DashboardPage';
import HoteisPage from './pages/HoteisPage';
import ReservasPage from './pages/ReservasPage';
import HospedesPage from './pages/HospedesPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from './theme/theme';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ToastContainer
          autoClose={3000}
          position="top-right"
          theme="colored"
          toastStyle={{
            backgroundColor: "#1a2a3a",
            color: "#fff"
          }}
          progressStyle={{
            background: "#f59e0b"
          }}
        />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/hoteis" element={<HoteisPage />} />
          <Route path="/reservas" element={<ReservasPage />} />
          <Route path="/hospedes" element={<HospedesPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;