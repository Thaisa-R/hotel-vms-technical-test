import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
} from '@mui/material';
import { Close } from '@mui/icons-material';

export default function MuiModal({ open, onClose, title, children, actions }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '15px',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
        <Box sx={{ fontSize: '20px', fontWeight: 600, color: '#1a2a3a' }}>
          {title}
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            color: '#666',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        {children}
      </DialogContent>
      {actions && <DialogActions sx={{ p: 3, pt: 1, gap: 2 }}>{actions}</DialogActions>}
    </Dialog>
  );
}
