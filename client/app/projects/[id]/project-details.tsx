"use client";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProjectById } from '@/app/api/projects';
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  Container,
  Typography,
  IconButton,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Project } from "@/app/shared/types";

const MotionBox = motion("div");
const MotionTypography = motion("p");

export const ProjectDetails = ({ project: initialProject }: { project: Project }) => {
  const { scrollY } = useScroll();

  const { data: project = initialProject } = useQuery({
    queryKey: ['project', initialProject.id],
    queryFn: () => getProjectById(initialProject.id),
    initialData: initialProject,
  });

  const imageScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const contentY = useTransform(scrollY, [0, 300], [60, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const containerStyle = {
    scale: imageScale,
    position: "relative" as const,
    height: "50vh",
    marginBottom: "4px",
    overflow: "hidden",
    borderRadius: "2px",
    "@media (max-width: 600px)": {
      height: "30vh",
    },
  };

  return (
    <Container maxWidth="lg" sx={{ pb: 8 }}>
      <Box
        sx={{
          position: "sticky",
          top: 64,
          left: {
            xs: 8,
            md: 20,
          },
          zIndex: 10,
        }}
      >
        <IconButton
          component={Link}
          href="/projects"
          sx={{
            position: "absolute",
            top: 20,
            left: {
              xs: 8,
              md: 20,
            },
            zIndex: 10,
            bgcolor: "white",
            boxShadow: 2,
            "&:hover": {
              bgcolor: "gray.20",
              transform: "scale(1.1)",
            },
          }}
        >
          <ArrowBack />
        </IconButton>
      </Box>

      <MotionBox style={containerStyle}>
        <Box
          component="img"
          key={project.images[0]}
          src={project.images[0]}
          alt={project.title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
            p: 4,
          }}
        >
          <MotionTypography
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "white",
              textShadow: "0 0 10px rgba(0,0,0,0.5)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {project.title}
          </MotionTypography>
        </Box>
      </MotionBox>

      <MotionBox
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: contentY }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{ mb: 6 }}
          component={motion.div}
          variants={itemVariants}
        >
          <Box>
            <Typography sx={({ palette }) => ({
              color: palette.teal[80]
            })}>Organization</Typography>
            <Typography sx={({ palette }) => ({
              color: palette.teal[50]
            })} variant="h6">{project.organization}</Typography>
          </Box>
          <Box>
            <Typography sx={({ palette }) => ({
              color: palette.teal[80]
            })}>Date</Typography>
            <Typography sx={({ palette }) => ({
              color: palette.teal[50]
            })} variant="h6">
              {new Date(project.date).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </Typography>
          </Box>
        </Stack>

        <Box mb={4} component={motion.div} variants={itemVariants}>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {project.categories.map((category) => (
              <Chip
                key={category}
                label={category}
                variant="outlined"
                sx={{
                  borderRadius: 1,
                  bgcolor: "teal.100",
                  "&:hover": {
                    bgcolor: "teal.80",
                  },
                }}
              />
            ))}
          </Stack>
        </Box>

        <MotionBox variants={itemVariants} style={{ marginBottom: 6 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, color: "teal.80" }}>
            Summary
          </Typography>
          <Typography color="text.secondary" sx={{ whiteSpace: "pre-wrap" }}>
            {project.summary}
          </Typography>
        </MotionBox>

        {project.description && (
          <MotionBox variants={itemVariants}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
              Details
            </Typography>
            <Typography color="text.secondary" sx={{ whiteSpace: "pre-wrap" }}>
              {project.description}
            </Typography>
          </MotionBox>
        )}
      </MotionBox>
    </Container>
  );
};
