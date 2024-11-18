// ProjectDetails.tsx
"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Box, 
  Container, 
  Typography, 
  useTheme, 
  useMediaQuery, 
  Button,
  Paper,
  styled
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Project } from '@/app/shared/types';

const MotionDiv = motion.div;

// Main layout container
const LayoutContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  minHeight: '100vh',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

// Image section
const ImageSection = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  height: '100vh',
  backgroundColor: '#000',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    position: 'relative',
    height: '50vh',
  },
}));

// Sidebar
const Sidebar = styled(Box)(({ theme }) => ({
  height: '100vh',
  overflow: 'auto',
  padding: theme.spacing(4),
  borderLeft: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('md')]: {
    height: 'auto',
    borderLeft: 'none',
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));

const DownloadButton = styled(Button)(({ theme }) => ({
  border: '2px solid white',
  color: 'white',
  padding: theme.spacing(2, 4),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid white',
  },
}));

interface ProjectDetailsProps {
  project: Project;
}

export const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container>
      <AnimatePresence>
      <LayoutContainer>
        {/* Image Section */}
        <ImageSection>
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Box
              component="a"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: 'none' }}
            >
              <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    opacity: 0.7,
                  }}
                />
                <Box
                  sx={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    p: 4,
                  }}
                >
                  <MotionDiv
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <DownloadButton variant="outlined">
                      DOWNLOAD PROJECT BUTTON
                    </DownloadButton>
                  </MotionDiv>
                </Box>
              </Box>
            </Box>
          </MotionDiv>
        </ImageSection>

        {/* Sidebar */}
        <Sidebar>
          <MotionDiv
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              component={Link}
              href="/projects"
              startIcon={<ArrowBack />}
              sx={{ mb: 3 }}
            >
              Back to Projects
            </Button>

            <Typography variant="h4" component="h1" gutterBottom>
              {project.title}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ 
                whiteSpace: 'pre-wrap',
                mb: 4
              }}
            >
              {project.description}
            </Typography>

            {/* Additional content can be added here */}
          </MotionDiv>
        </Sidebar>
      </LayoutContainer>
    </AnimatePresence>
    </Container>
  );
}