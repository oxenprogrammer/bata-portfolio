"use client";
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export const Toast = ({ message, onClose }: ToastProps) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        backgroundColor: '#4DB6AC',
        color: 'white',
        padding: 2,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        zIndex: 9999,
      }}
    >
      {message}
      <IconButton size="small" onClick={onClose} sx={{ color: 'white' }}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};
