"use client";
import { Project } from "@/app/shared/types";
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

interface ProjectDetailsProps {
  project: Project;
}

export const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <Box>
      <StyledHeader sx={{ backgroundImage: `url(${project.imageUrl})` }}>
        <HeaderContent>
          <Container maxWidth="lg">
            <Button
              component={Link}
              href="/projects"
              startIcon={<ArrowLeft />}
              sx={{ mb: 2, color: 'white' }}
            >
              Back to Projects
            </Button>
            <Typography variant="h2" gutterBottom>
              {project.title}
            </Typography>
            <Typography variant="h5" sx={{ mb: 2, opacity: 0.9 }}>
              {project.description}
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
