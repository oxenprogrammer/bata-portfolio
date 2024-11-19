"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Box, Container, Typography, Button, styled } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Project } from "@/app/shared/types";

interface ProjectDetailsProps {
  project: Project;
}

const MotionDiv = motion.div;

const LayoutContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  position: "relative",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const ImageSection = styled(Box)(({ theme }) => ({
  position: "sticky",
  top: 0,
  height: "100vh",
  backgroundColor: "#000",
  [theme.breakpoints.down("md")]: {
    position: "relative",
    height: "50vh",
  },
}));

// New ImageOverlay component for the download button
const ImageOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.3)", // Optional overlay for better button visibility
  zIndex: 2,
}));

const Sidebar = styled(Box)(({ theme }) => ({
  height: "100vh",
  overflowY: "auto",
  overflowX: "hidden",
  padding: theme.spacing(4),
  borderLeft: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  "&::-webkit-scrollbar": {
    display: "none",
  },
  [theme.breakpoints.down("md")]: {
    height: "100%",
    borderLeft: "none",
    borderTop: `1px solid ${theme.palette.divider}`,
  },

  // Hide scrollbar for IE, Edge and Firefox
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none", // Firefox
  [theme.breakpoints.down("md")]: {
    height: "auto",
    borderLeft: "none",
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));

const DescriptionContainer = styled(Box)(({ theme }) => ({
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  overflowWrap: "break-word",
  width: "100%",
  maxWidth: "100%",
  marginBottom: theme.spacing(4),
}));

const DownloadButton = styled(Button)(({ theme }) => ({
  border: "2px solid white",
  color: "white",
  padding: theme.spacing(2, 4),
  backdropFilter: "blur(4px)",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "2px solid white",
  },
}));

export const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sidebarRef.current) return;

      const sidebar = sidebarRef.current;
      const { scrollTop, scrollHeight, clientHeight } = sidebar;
      const isScrolledToBottom = scrollHeight - scrollTop === clientHeight;

      // If we're not at the bottom of the sidebar content,
      // prevent the default scroll and manually scroll the sidebar
      if (!isScrolledToBottom) {
        e.preventDefault();
        sidebar.scrollTop += e.deltaY;
      }
    };

    const imageSection = imageRef.current;
    if (imageSection) {
      imageSection.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (imageSection) {
        imageSection.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <Container sx={({breakpoints})  => ({ position: "relative", minHeight: "100vh", [breakpoints.down('md')]: { minHeight: 'auto' } })}>
      <AnimatePresence>
        <LayoutContainer>
          {/* Image Section */}
          <ImageSection ref={imageRef}>
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              style={{ height: "100%" }}
            >
              <Box
                component="a"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  textDecoration: "none",
                  height: "100%",
                  position: "relative",
                  display: "block"
                }}
              >
                <Box
                  component="img"
                  src={project.imageUrl}
                  alt={project.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block"
                  }}
                />
                <ImageOverlay>
                  <MotionDiv
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <DownloadButton variant="outlined">
                      DOWNLOAD PROJECT BUTTON
                    </DownloadButton>
                  </MotionDiv>
                </ImageOverlay>
              </Box>
            </MotionDiv>
          </ImageSection>

          {/* Sidebar */}
          <Sidebar ref={sidebarRef}>
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

              <DescriptionContainer color="text.secondary">
                {project.description}
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg erdtfds
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg erdtfds
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg erdtfds
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg
                erdtfdsadfhgfdsadhgfdsadfghfdsadfg erdtfds
              </DescriptionContainer>

              {/* Additional content can be added here */}
            </MotionDiv>
          </Sidebar>
        </LayoutContainer>
      </AnimatePresence>
    </Container>
  );
};
