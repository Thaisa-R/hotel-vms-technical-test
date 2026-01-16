import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Plus } from 'lucide-react';

export default function DataTable({
  title,
  headers,
  data,
  onAdd,
  onEdit,
  onDelete,
  addButtonText,
  loading = false,
  emptyMessage = 'Nenhum registro encontrado',
  renderRow,
  renderListItem,
  getCellValue,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (loading) {
    return (
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
          <CircularProgress sx={{ color: '#1a2a3a' }} />
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, boxShadow: 2 }}>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        mb: 3,
        gap: { xs: 2, sm: 0 }
      }}>
        <Typography variant="h2" sx={{ fontSize: { xs: '18px', md: '20px' } }}>{title}</Typography>
        {onAdd && (
          <Button
            variant="contained"
            onClick={onAdd}
            sx={{
              bgcolor: '#1a2a3a',
              '&:hover': { bgcolor: '#2c3e50' },
              width: { xs: '100%', sm: 'auto' }
            }}
            startIcon={addButtonText && <Plus size={16} />}
          >
            {addButtonText}
          </Button>
        )}
      </Box>

      {data.length === 0 ? (
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          {emptyMessage}
        </Alert>
      ) : isMobile ? (

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {data.map((item, index) => {
            const cells = renderRow(item);
            const cellArray = React.Children.toArray(cells);

            const extractCellContent = (element) => {
              if (!element) return '';

              if (typeof element === 'string' || typeof element === 'number') {
                return String(element);
              }

              if (React.isValidElement(element)) {
                const props = element.props || {};
                const children = props.children;

                if (!children) return '';

                if (typeof children === 'string' || typeof children === 'number') {
                  return String(children);
                }

                if (Array.isArray(children)) {
                  return children
                    .map(child => extractCellContent(child))
                    .filter(Boolean)
                    .join(' ');
                }

                if (React.isValidElement(children)) {
                  return extractCellContent(children);
                }
              }

              return '';
            };

            return (
              <Card key={item.id || index} sx={{ borderRadius: 2, boxShadow: 2 }}>
                <CardContent>
                  {renderListItem ? (
                    renderListItem(item)
                  ) : (
                    <Box>
                      {headers.map((header, headerIndex) => {
                        let cellContent = '';

                        if (getCellValue) {
                          cellContent = getCellValue(item, headerIndex, header);
                        } else {
                          const cell = cellArray[headerIndex];
                          cellContent = extractCellContent(cell);
                        }

                        return (
                          <Box key={headerIndex} sx={{ mb: 1.5, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.5 }}>
                            <Typography sx={{ fontWeight: 600, color: '#666', fontSize: '14px' }}>
                              {header}:
                            </Typography>
                            <Typography sx={{ color: '#1a2a3a', fontSize: '14px' }}>
                              {cellContent || '-'}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  )}
                  {(onEdit || onDelete) && (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-start' }}>
                        <Typography sx={{ fontWeight: 600, color: '#666', fontSize: '14px' }}>
                          Ações:
                        </Typography>
                        {onEdit && (
                          <IconButton
                            size="small"
                            onClick={() => onEdit(item)}
                            sx={{ color: '#1a2a3a' }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        )}
                        {onDelete && (
                          <IconButton
                            size="small"
                            onClick={() => onDelete(item)}
                            sx={{ color: '#ef4444' }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </Box>
      ) : (
        <TableContainer
          sx={{
            borderRadius: 2,
            border: '1px solid #e2e8f0',
            overflowX: 'auto',
            overflowY: 'hidden',
            maxWidth: '100%'
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: '#f9fafb' }}>
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell key={index} sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                    {header}
                  </TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Ações</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.id || index} hover>
                  {renderRow(item)}
                  {(onEdit || onDelete) && (
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        {onEdit && (
                          <IconButton
                            size="small"
                            onClick={() => onEdit(item)}
                            sx={{ color: '#1a2a3a' }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        )}
                        {onDelete && (
                          <IconButton
                            size="small"
                            onClick={() => onDelete(item)}
                            sx={{ color: '#ef4444' }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
