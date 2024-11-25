"use client";
import React, { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  Container,
  Typography,
  IconButton,
  Box,
  Chip,
  Stack,
  alpha,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Project } from "@/app/shared/types";

const MotionBox = motion("div");
const MotionTypography = motion("p");
const MotionImage = motion("img");

interface ProjectDetailsProps {
  project: Project;
}

export const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  const { scrollY } = useScroll();

  // Transform values for parallax and fade effects
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const imageScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const contentY = useTransform(scrollY, [0, 300], [60, 0]);

  // Initial animation variants
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

      {/* Hero Image Section */}
      <MotionBox style={containerStyle}>
        <Box
          component="img"
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
            color="white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {project.title}
          </MotionTypography>
        </Box>
      </MotionBox>

      {/* Content Section */}
      <MotionBox
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: contentY }}
      >
        {/* Project Meta */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{ mb: 6 }}
          component={motion.div}
          variants={itemVariants}
        >
          <Box>
            <Typography color="text.secondary">Organization</Typography>
            <Typography variant="h6">{project.organization}</Typography>
          </Box>
          <Box>
            <Typography color="text.secondary">Date</Typography>
            <Typography variant="h6">
              {new Date(project.date).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </Typography>
          </Box>
        </Stack>

        {/* Categories */}
        <Box mb={4} component={motion.div} variants={itemVariants}>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {project.categories.map((category) => (
              <Chip
                key={category}
                label={category}
                variant="outlined"
                sx={{
                  borderRadius: 1,
                  "&:hover": {
                    bgcolor: alpha("#fff", 0.1),
                  },
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Summary */}
        <MotionBox variants={itemVariants} style={{ marginBottom: 6 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
            Summary
          </Typography>
          <Typography color="text.secondary" sx={{ whiteSpace: "pre-wrap" }}>
            {project.summary}
          </Typography>
        </MotionBox>

        {/* Description */}
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
