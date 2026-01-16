import { useState } from "react";
import api from "../services/api";
import logo from "../assets/HotelVMS-LF.png";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import PasswordField from "../components/PasswordField";

export default function Login() {
  const [usuario, setUsuario] = useState("admin");
  const [senha, setSenha] = useState("123456");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/login", { usuario, senha });
      localStorage.setItem("token", response.data.token);
      toast.success("Bem-vindo(a) ao Hotel VMS!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Usuário ou senha inválidos! Tente novamente.");
    }
  }

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        height: '100vh', 
        width: '100vw', 
        overflow: 'auto',
        backgroundColor: { xs: '#f5f5f5', md: 'transparent' },
      }}
    >
      {/* LADO ESQUERDO: Imagem como fundo total (oculto no mobile) */}
      {!isMobile && (
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${logo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: { xs: 'none', md: 'block' },
          }}
        />
      )}

      {/* LADO DIREITO: Card de Login */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: { xs: '#f5f5f5', md: '#1e1e1e' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, sm: 3, md: 2.5 },
          minHeight: { xs: '100vh', md: 'auto' },
        }}
      >
        {/* Logo no mobile */}
        {isMobile && (
          <Box sx={{ mt: 1, mb: 1, textAlign: 'center' }}>
            <img 
              src={logo} 
              alt="Hotel VMS" 
              style={{ 
                maxWidth: '350px', 
                height: 'auto',
                objectFit: 'contain'
              }} 
            />
          </Box>
        )}
        
        <Paper
          sx={{
            backgroundColor: '#fff',
            width: '100%',
            maxWidth: { xs: '100%', sm: '400px', md: '350px' },
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: { xs: '16px', md: '24px' },
            textAlign: 'center',
            boxShadow: { xs: '0 4px 12px rgba(0,0,0,0.1)', md: '0 10px 25px rgba(0,0,0,0.2)' },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '22px', sm: '24px', md: '26px' },
              color: '#1a2a3a',
              mb: 1,
              fontWeight: 700,
            }}
          >
            Acesse sua conta
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '13px', md: '14px' },
              color: '#666',
              mb: { xs: 3, md: 3.75 },
            }}
          >
            Use suas credenciais para gerenciar o hotel
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: 2.25,
            }}
          >
            <TextField
              label="Usuário"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="ex: admin"
              required
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: '#fcfcfc',
                },
              }}
            />

            <PasswordField
              label="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: '#fcfcfc',
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: { xs: 1, md: 1.25 },
                py: { xs: 1.5, md: 2 },
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: { xs: '15px', md: '16px' },
                bgcolor: '#1a2a3a',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#2c3e50',
                },
              }}
            >
              Entrar
            </Button>
          </Box>

          <Typography
            sx={{
              mt: { xs: 2, md: 2.5 },
              fontSize: { xs: '11px', md: '12px' },
              color: '#999',
            }}
          >
            Hotel VMS - Gerenciamento Hoteleiro Profissional
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
