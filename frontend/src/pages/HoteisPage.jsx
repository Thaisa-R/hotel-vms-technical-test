import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import DataTable from "../components/DataTable";
import MuiModal from "../components/MuiModal";
import { Box, Button, TextField, TableCell } from '@mui/material';
import Layout from "../components/Layout";

export default function HoteisPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: '', cidade: '', qtd_quartos: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/hoteis");
      setHotels(response.data);
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

  async function handleDelete(hotel) {
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
        await api.delete(`/hoteis/${hotel.id}`);
        toast.success("Excluído com sucesso!");
        fetchData();
      } catch (err) {
        const mensagemErro = err.response?.data?.message || "";
        if (mensagemErro.includes("vinculado") || err.response?.status === 500) {
          toast.error("Não é possível excluir: existem vínculos ativos.");
        } else {
          toast.error("Erro ao excluir o item.");
        }
      }
    }
  }

  const handleEdit = (hotel) => {
    setIsEditing(true);
    setCurrentId(hotel.id);
    setFormData({ nome: hotel.nome, cidade: hotel.cidade, qtd_quartos: hotel.qtd_quartos });
    setIsModalOpen(true);
  };

  const handleHotelSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = { 
        ...formData, 
        qtd_quartos: Number(formData.qtd_quartos) 
      };
      
      if (isEditing) {
        await api.put(`/hoteis/${currentId}`, dataToSend);
        toast.success("Hotel atualizado com sucesso!");
      } else {
        await api.post("/hoteis", dataToSend);
        toast.success("Hotel cadastrado com sucesso!");
      }
      
      setIsModalOpen(false);
      setIsEditing(false);
      setFormData({ nome: '', cidade: '', qtd_quartos: '' });
      fetchData();
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || "Erro ao salvar hotel.";
      toast.error(errorMessage);
      console.error(error);
    }
  };

  const handleNewHotel = () => {
    setIsEditing(false);
    setFormData({ nome: '', cidade: '', qtd_quartos: '' });
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <Typography variant="h1" sx={{ mb: 4, fontSize: { xs: '24px', md: '32px' } }}>
        Gerenciar Hotéis
      </Typography>

      <DataTable
        title="Lista de Hotéis"
        headers={['Nome', 'Cidade', 'Quartos']}
        data={hotels}
        loading={loading}
        onAdd={handleNewHotel}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addButtonText="Novo Hotel"
        emptyMessage="Nenhum hotel cadastrado"
        renderRow={(h) => (
          <>
            <TableCell>{h.nome}</TableCell>
            <TableCell>{h.cidade}</TableCell>
            <TableCell>{h.qtd_quartos}</TableCell>
          </>
        )}
        getCellValue={(item, index) => {
          const values = [item.nome, item.cidade, item.qtd_quartos];
          return values[index] || '-';
        }}
      />

      <MuiModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditing(false);
          setFormData({ nome: '', cidade: '', qtd_quartos: '' });
        }}
        title={isEditing ? 'Editar Hotel' : 'Novo Hotel'}
        actions={
          <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
            <Button
              variant="outlined"
              onClick={() => {
                setIsModalOpen(false);
                setIsEditing(false);
                setFormData({ nome: '', cidade: '', qtd_quartos: '' });
              }}
              sx={{ flex: 1 }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={handleHotelSubmit}
              sx={{ flex: 1, bgcolor: '#1a2a3a', '&:hover': { bgcolor: '#2c3e50' } }}
            >
              Salvar
            </Button>
          </Box>
        }
      >
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            required
            fullWidth
          />
          <TextField
            label="Cidade"
            value={formData.cidade}
            onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
            required
            fullWidth
          />
          <TextField
            label="Quartos"
            type="number"
            value={formData.qtd_quartos}
            onChange={(e) => setFormData({ ...formData, qtd_quartos: e.target.value })}
            required
            fullWidth
          />
        </Box>
      </MuiModal>
    </Layout>
  );
}
