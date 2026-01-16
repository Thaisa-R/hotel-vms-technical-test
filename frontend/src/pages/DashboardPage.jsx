import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import { Typography, Box, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import StatCard from "../components/StatCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { Hotel, CalendarCheck, Users } from "lucide-react";
import Layout from "../components/Layout";

export default function DashboardPage() {
  const [hotels, setHotels] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [hoteisRes, reservasRes, hospedesRes] = await Promise.all([
        api.get("/hoteis"),
        api.get("/reservas"),
        api.get("/hospedes")
      ]);
      setHotels(hoteisRes.data);
      setReservations(reservasRes.data);
      setGuests(hospedesRes.data);
    } catch (err) {
      toast.error("Erro ao carregar dados.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [datePart] = dateString.split("T"); 
    const [year, month, day] = datePart.split("-");
    return `${day}/${month}/${year}`;
  };

  const calcularQuartosDisponiveis = (hotel) => {
    if (!reservations || reservations.length === 0) {
      return hotel.qtd_quartos;
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    // Conta apenas reservas ATIVAS (check-in <= hoje <= check-out)
    // Boa prática: só reserva o quarto quando a data chega
    const reservasAtivas = reservations.filter(reserva => {
      // Garante que os IDs sejam comparados como números
      const hotelId = Number(hotel.id);
      const reservaHotelId = Number(reserva.hotel_id);
      
      if (reservaHotelId !== hotelId) return false;
      
      // Extrai apenas a data (sem hora) para comparação
      let checkInStr = reserva.data_checkin;
      let checkOutStr = reserva.data_checkout;
      
      if (typeof checkInStr === 'string' && checkInStr.includes('T')) {
        checkInStr = checkInStr.split('T')[0];
      }
      if (typeof checkOutStr === 'string' && checkOutStr.includes('T')) {
        checkOutStr = checkOutStr.split('T')[0];
      }
      
      const checkIn = new Date(checkInStr);
      const checkOut = new Date(checkOutStr);
      checkIn.setHours(0, 0, 0, 0);
      checkOut.setHours(0, 0, 0, 0);
      
      // Reserva está ATIVA se hoje está entre check-in e check-out (inclusive)
      return hoje >= checkIn && hoje <= checkOut;
    }).length;
    
    const disponiveis = hotel.qtd_quartos - reservasAtivas;
    return Math.max(0, disponiveis); // Não permite negativo
  };

  return (
    <Layout>
      <Typography variant="h1" sx={{ mb: 4, fontSize: { xs: '24px', md: '32px' } }}>
        Dashboard
      </Typography>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, 
            gap: 3, 
            mb: 4 
          }}>
            <StatCard
              title="Total de Hotéis"
              value={hotels.length}
              icon={Hotel}
              color="#f59e0b"
            />
            <StatCard
              title="Total de Reservas"
              value={reservations.length}
              icon={CalendarCheck}
              color="#f59e0b"
            />
            <StatCard
              title="Total de Hóspedes"
              value={guests.length}
              icon={Users}
              color="#f59e0b"
            />
          </Box>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, 
            gap: 3 
          }}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
              <Typography variant="h3" sx={{ mb: 2, color: '#1a2a3a' }}>
                Reservas Recentes
              </Typography>
              {reservations.slice(0, 5).length === 0 ? (
                <Typography sx={{ color: '#666', fontStyle: 'italic' }}>
                  Nenhuma reserva recente
                </Typography>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {reservations.slice(0, 5).map((r) => (
                    <Box
                      key={r.id}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: '#f9fafb',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      <Typography sx={{ fontWeight: 600, color: '#1a2a3a' }}>
                        {r.hospede_nome}
                      </Typography>
                      <Typography sx={{ fontSize: '12px', color: '#666' }}>
                        {r.Hotel?.nome || 'N/A'} • {formatDate(r.data_checkin)} - {formatDate(r.data_checkout)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
              <Typography variant="h3" sx={{ mb: 2, color: '#1a2a3a' }}>
                Hotéis Disponíveis
              </Typography>
              {hotels.length === 0 ? (
                <Typography sx={{ color: '#666', fontStyle: 'italic' }}>
                  Nenhum hotel cadastrado
                </Typography>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {hotels.map((h) => (
                    <Box
                      key={h.id}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: '#f9fafb',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      <Typography sx={{ fontWeight: 600, color: '#1a2a3a' }}>
                        {h.nome}
                      </Typography>
                      <Typography sx={{ fontSize: '12px', color: '#666' }}>
                        {h.cidade} • {calcularQuartosDisponiveis(h)}/{h.qtd_quartos} quartos disponíveis
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>
          </Box>
        </>
      )}
    </Layout>
  );
}
