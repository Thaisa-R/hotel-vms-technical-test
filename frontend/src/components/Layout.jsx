import { useState } from 'react';
import { Box, Button, Typography, IconButton, Drawer, useMediaQuery, useTheme } from '@mui/material';
import { LayoutDashboard, Hotel, CalendarCheck, Users, LogOut, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoImg from '../assets/HotelVMS-logo.png';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const NavItem = ({ icon: Icon, label, path }) => {
    const isActive = location.pathname === path;
    
    return (
      <Box
        onClick={() => handleNavigation(path)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 1.5,
          py: 1.5,
          cursor: 'pointer',
          borderRadius: 2,
          mb: 0.5,
          transition: 'all 0.2s',
          backgroundColor: isActive ? '#2c3e50' : 'transparent',
          color: isActive ? '#f59e0b' : '#ffffff',
          '&:hover': {
            backgroundColor: isActive ? '#2c3e50' : 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <Icon size={20} color={isActive ? '#f59e0b' : '#ffffff'} />
        <Typography>{label}</Typography>
      </Box>
    );
  };

  const SidebarContent = () => (
    <Box
      sx={{
        width: '180px',
        height: '100%',
        bgcolor: '#1a2a3a',
        color: 'white',
        p: 2.5,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5, py: 2.5 }}>
        <img src={logoImg} alt="Logo Hotel VMS" style={{ width: '130px', height: 'auto', objectFit: 'contain' }} />
    
      </Box>
      <Box sx={{ flex: 1 }}>
        <NavItem
          icon={LayoutDashboard}
          label="Dashboard"
          path="/dashboard"
        />
        <NavItem
          icon={Hotel}
          label="Hotéis"
          path="/hoteis"
        />
        <NavItem
          icon={CalendarCheck}
          label="Reservas"
          path="/reservas"
        />
        <NavItem
          icon={Users}
          label="Hóspedes"
          path="/hospedes"
        />
      </Box>
      <Button
        onClick={() => { localStorage.clear(); navigate("/"); }}
        sx={{
          bgcolor: 'transparent',
          border: 'none',
          color: '#f59e0b',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mt: 'auto',
          textTransform: 'none',
          '&:hover': {
            bgcolor: 'transparent',
            color: '#fbbf24',
          },
        }}
      >
        <LogOut size={18} /> Sair
      </Button>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh', bgcolor: 'background.default' }}>
      {/* Mobile App Bar */}
      {isMobile && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: 56,
            bgcolor: '#1a2a3a',
            display: 'flex',
            alignItems: 'center',
            px: 2,
            zIndex: 1200,
            boxShadow: 2,
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ color: '#ffffff', mr: 2 }}
          >
            <Menu size={24} />
          </IconButton>
          
        </Box>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box
          sx={{
            width: '180px',
            flexShrink: 0,
          }}
        >
          <SidebarContent />
        </Box>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: '180px',
            },
          }}
        >
          <SidebarContent />
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 5 },
          pt: { xs: 8, md: 5 },
          width: { xs: '100%', md: 'calc(100% - 180px)' },
          overflowY: 'auto',
          bgcolor: 'background.default',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
