import { Paper } from '@mui/material';

export default function Card({ children, sx = {}, ...props }) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: 1,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
}
