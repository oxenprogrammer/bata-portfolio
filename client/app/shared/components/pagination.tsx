import React from 'react';
import { Box, IconButton, Button, styled } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationButton = styled(Button)(({ theme }) => ({
  minWidth: 40,
  padding: theme.spacing(1),
  margin: theme.spacing(0, 0.5),
  borderRadius: theme.shape.borderRadius,
  '&.active': {
    backgroundColor: theme.palette.teal[80],
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.teal[70],
    }
  }
}));

export const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;

    if (currentPage <= 3) return [...pages.slice(0, 5), '...', totalPages];
    if (currentPage >= totalPages - 2) return [1, '...', ...pages.slice(-5)];

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 4,
      }}
    >
      <IconButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        size="small"
        sx={{ mx: 1 }}
      >
        <ChevronLeft />
      </IconButton>

      {getVisiblePages().map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <Box sx={{ px: 1 }}>...</Box>
          ) : (
            <PaginationButton
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disableElevation
              className={page === currentPage ? 'active' : ''}
            >
              {page}
            </PaginationButton>
          )}
        </React.Fragment>
      ))}

      <IconButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        size="small"
        sx={{ mx: 1 }}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  );
};