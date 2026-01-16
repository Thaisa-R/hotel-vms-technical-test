import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import { Typography, Box, Button, TextField, TableCell, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import DataTable from "../components/DataTable";
import MuiModal from "../components/MuiModal";
import Layout from "../components/Layout";

export default function HospedesPage() {
  const [guests, setGuests] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestData, setGuestData] = useState({ nome: '', documento: '', reserva_id: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [hospedesRes, reservasRes] = await Promise.all([
        api.get("/hospedes"),
        api.get("/reservas")
      ]);
      setGuests(hospedesRes.data);
      setReservations(reservasRes.data);
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

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const [, timePart] = dateString.split("T");
    if (!timePart) return "";
    return timePart.substring(0, 5);
  };

  async function handleDelete(guest) {
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
        await api.delete(`/hospedes/${guest.id}`);
        toast.success("Excluído com sucesso!");
        fetchData();
      } catch (err) {
        toast.error("Erro ao excluir o item.");
      }
    }
  }

  const handleEdit = (guest) => {
    setIsEditing(true);
    setCurrentId(guest.id);
    setGuestData({ nome: guest.nome, documento: guest.documento, reserva_id: guest.reserva_id });
    setIsModalOpen(true);
  };

  const handleGuestSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...guestData,
        reserva_id: guestData.reserva_id ? Number(guestData.reserva_id) : null
      };
      
      if (isEditing) {
        await api.put(`/hospedes/${currentId}`, dataToSend);
        toast.success("Hóspede atualizado com sucesso!");
      } else {
        await api.post("/hospedes", dataToSend);
        toast.success("Hóspede cadastrado com sucesso!");
      }
      setIsModalOpen(false);
      setIsEditing(false);
      setGuestData({ nome: '', documento: '', reserva_id: '' });
      fetchData();
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || "Erro ao salvar hóspede.";
      toast.error(errorMessage);
      console.error(error);
    }
  };

  const handleNewGuest = () => {
    setIsEditing(false);
    setGuestData({ nome: '', documento: '', reserva_id: '' });
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <Typography variant="h1" sx={{ mb: 4, fontSize: { xs: '24px', md: '32px' } }}>
        Gerenciar Hóspedes
      </Typography>

      <DataTable
        title="Lista de Hóspedes"
        headers={['Nome', 'Documento', 'Data de cadastro', 'Hora', 'Reserva']}
        data={guests}
        loading={loading}
        onAdd={handleNewGuest}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addButtonText="Novo Hóspede"
        emptyMessage="Nenhum hóspede cadastrado"
        renderRow={(g) => (
          <>
            <TableCell>{g.nome}</TableCell>
            <TableCell>{g.documento}</TableCell>
            <TableCell>{formatDate(g.createdAt)}</TableCell>
            <TableCell>{formatTime(g.createdAt)}</TableCell>
            <TableCell>Reserva {g.reserva_id}</TableCell>
          </>
        )}
        getCellValue={(item, index) => {
          const values = [
            item.nome,
            item.documento,
            formatDate(item.createdAt),
            formatTime(item.createdAt),
            `Reserva ${item.reserva_id}`
          ];
          return values[index] || '-';
        }}
      />

      <MuiModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditing(false);
          setGuestData({ nome: '', documento: '', reserva_id: '' });
        }}
        title={isEditing ? 'Editar Hóspede' : 'Novo Hóspede'}
        actions={
          <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
            <Button
              variant="outlined"
              onClick={() => {
                setIsModalOpen(false);
                setIsEditing(false);
                setGuestData({ nome: '', documento: '', reserva_id: '' });
              }}
              sx={{ flex: 1 }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={handleGuestSubmit}
              sx={{ flex: 1, bgcolor: '#1a2a3a', '&:hover': { bgcolor: '#2c3e50' } }}
            >
              Salvar
            </Button>
          </Box>
        }
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nome"
            value={guestData.nome}
            onChange={(e) => setGuestData({ ...guestData, nome: e.target.value })}
            required
            fullWidth
          />
          <TextField
            label="Documento (CPF/Pass)"
            value={guestData.documento}
            onChange={(e) => setGuestData({ ...guestData, documento: e.target.value })}
            required
            fullWidth
          />
          <FormControl fullWidth required>
            <InputLabel>Vincular à Reserva</InputLabel>
            <Select
              value={guestData.reserva_id}
              label="Vincular à Reserva"
              onChange={(e) => setGuestData({ ...guestData, reserva_id: e.target.value })}
            >
              <MenuItem value="">Vincular à Reserva</MenuItem>
              {reservations.map((r) => (
                <MenuItem key={r.id} value={r.id}>
                  Reserva #{r.id} - {r.hospede_nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </MuiModal>
    </Layout>
  );
}
