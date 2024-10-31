"use client";
import { Blog } from "@/app/shared/types";
import { Box, Container, Typography, Button, styled } from "@mui/material";
import { ArrowLeft } from "@mui/icons-material";
import Link from "next/link";

const StyledHeader = styled(Box)(() => ({
  position: 'relative',
  height: '400px',
  width: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
  },
}));

const HeaderContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: theme.spacing(4),
  color: theme.palette.common.white,
}));

interface BlogDetailsProps {
  blog: Blog;
}

export const BlogDetails = ({ blog }: BlogDetailsProps) => {
  return (
    <Box>
      <StyledHeader sx={{ backgroundImage: `url(${blog.imageUrl})` }}>
        <HeaderContent>
          <Container maxWidth="lg">
            <Button
              component={Link}
              href="/blogs"
              startIcon={<ArrowLeft />}
              sx={{ mb: 2, color: 'white' }}
            >
              Back to blogs
            </Button>
            <Typography variant="h2" gutterBottom>
              {blog.title}
            </Typography>
            <Typography variant="h5" sx={{ mb: 2, opacity: 0.9 }}>
              {blog.description}
            </Typography>
          </Container>
        </HeaderContent>
      </StyledHeader>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          more
        </Box>
      </Container>
    </Box>
  );
};
