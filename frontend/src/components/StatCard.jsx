import { Card, Typography, Box } from '@mui/material';

export default function StatCard({ title, value, icon: Icon, color = '#f59e0b' }) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: 2,
        background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography sx={{ color, fontWeight: 700, mb: 1, fontSize: '14px' }}>
            {title}
          </Typography>
          <Typography sx={{ fontSize: '36px', fontWeight: 'bold', color: '#1a2a3a' }}>
            {value}
          </Typography>
        </Box>
        {Icon && (
          <Box
            sx={{
              bgcolor: `${color}15`,
              borderRadius: 2,
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={24} color={color} />
          </Box>
        )}
      </Box>
    </Card>
  );
}
