import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import { Typography, Box, Button, TextField, TableCell, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import DataTable from "../components/DataTable";
import MuiModal from "../components/MuiModal";
import Layout from "../components/Layout";

export default function ReservasPage() {
  const [reservations, setReservations] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservaData, setReservaData] = useState({ hospede_nome: '', data_checkin: '', data_checkout: '', hotel_id: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [reservasRes, hoteisRes] = await Promise.all([
        api.get("/reservas"),
        api.get("/hoteis")
      ]);
      setReservations(reservasRes.data);
      setHotels(hoteisRes.data);
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

  async function handleDelete(reserva) {
    const resultado = await Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter esta ação!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f59e0b',
      cancelButtonColor: '#1a2a3a',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
      background: '#fff',
      borderRadius: '16px',
      width: '350px',
      heightAuto: true,
    });

    if (resultado.isConfirmed) {
      try {
        await api.delete(`/reservas/${reserva.id}`);
        toast.success("Excluído com sucesso!");
        fetchData();
      } catch (err) {
        toast.error("Erro ao excluir o item.");
      }
    }
  }

  const handleEdit = (reserva) => {
    setIsEditing(true);
    setCurrentId(reserva.id);
    setReservaData({ 
      hospede_nome: reserva.hospede_nome, 
      data_checkin: reserva.data_checkin.split('T')[0],
      data_checkout: reserva.data_checkout.split('T')[0], 
      hotel_id: reserva.hotel_id 
    });
    setIsModalOpen(true);
  };

  const handleReservaSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...reservaData,
        hotel_id: reservaData.hotel_id ? Number(reservaData.hotel_id) : null
      };
      
      if (isEditing) {
        await api.put(`/reservas/${currentId}`, dataToSend);
        toast.success("Reserva atualizada com sucesso!");
      } else {
        await api.post("/reservas", dataToSend);
        toast.success("Reserva cadastrada com sucesso!");
      }
      setIsModalOpen(false);
      setIsEditing(false);
      setReservaData({ hospede_nome: '', data_checkin: '', data_checkout: '', hotel_id: '' });
      fetchData();
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || "Erro ao salvar reserva.";
      toast.error(errorMessage);
      console.error(error);
    }
  };

  const handleNewReserva = () => {
    setIsEditing(false);
    setReservaData({ hospede_nome: '', data_checkin: '', data_checkout: '', hotel_id: '' });
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <Typography variant="h1" sx={{ mb: 4, fontSize: { xs: '24px', md: '32px' } }}>
        Gerenciar Reservas
      </Typography>

      <DataTable
        title="Lista de Reservas"
        headers={['Nome', 'Hotel', 'Check-in', 'Check-out']}
        data={reservations}
        loading={loading}
        onAdd={handleNewReserva}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addButtonText="Nova Reserva"
        emptyMessage="Nenhuma reserva cadastrada"
        renderRow={(r) => (
          <>
            <TableCell>{r.hospede_nome}</TableCell>
            <TableCell>{r.Hotel?.nome || "N/A"}</TableCell>
            <TableCell>{formatDate(r.data_checkin)}</TableCell>
            <TableCell>{formatDate(r.data_checkout)}</TableCell>
          </>
        )}
        getCellValue={(item, index) => {
          const values = [
            item.hospede_nome,
            item.Hotel?.nome || "N/A",
            formatDate(item.data_checkin),
            formatDate(item.data_checkout)
          ];
          return values[index] || '-';
        }}
      />

      <MuiModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditing(false);
          setReservaData({ hospede_nome: '', data_checkin: '', data_checkout: '', hotel_id: '' });
        }}
        title={isEditing ? 'Editar Reserva' : 'Nova Reserva'}
        actions={
          <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
            <Button
              variant="outlined"
              onClick={() => {
                setIsModalOpen(false);
                setIsEditing(false);
                setReservaData({ hospede_nome: '', data_checkin: '', data_checkout: '', hotel_id: '' });
              }}
              sx={{ flex: 1 }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={handleReservaSubmit}
              sx={{ flex: 1, bgcolor: '#1a2a3a', '&:hover': { bgcolor: '#2c3e50' } }}
            >
              Confirmar
            </Button>
          </Box>
        }
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nome do Responsável pela Reserva"
            value={reservaData.hospede_nome}
            onChange={(e) => setReservaData({ ...reservaData, hospede_nome: e.target.value })}
            required
            fullWidth
          />
          <FormControl fullWidth required>
            <InputLabel>Hotel</InputLabel>
            <Select
              value={reservaData.hotel_id}
              label="Hotel"
              onChange={(e) => setReservaData({ ...reservaData, hotel_id: e.target.value })}
            >
              <MenuItem value="">Selecione um Hotel</MenuItem>
              {hotels.map((h) => (
                <MenuItem key={h.id} value={h.id}>{h.nome}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Check-in"
            type="date"
            value={reservaData.data_checkin}
            onChange={(e) => setReservaData({ ...reservaData, data_checkin: e.target.value })}
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Check-out"
            type="date"
            value={reservaData.data_checkout}
            onChange={(e) => setReservaData({ ...reservaData, data_checkout: e.target.value })}
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </MuiModal>
    </Layout>
  );
}
