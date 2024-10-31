"use client";

import { useQuery } from "@tanstack/react-query";
import { Box, Typography, styled } from "@mui/material";
import HomeContent from "@/app/shared/components/home-content";
import { getProjects } from "@/app/api/projects";
import { ViewMoreButtonComponent } from "@/app/shared/components/view-more-button";
import { AnimateCard, LoadingProjectGrid, ProjectCard } from "@/app/shared/components";

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
  maxWidth: theme.breakpoints.values.xl,
  margin: "0 auto",
  padding: theme.spacing(0, 2),
  width: "100%",
}));

const StyledContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(1),
  width: "100%",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
}));

export const ProjectsSection = () => {
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <HomeContent backgroundText="projects" title="My Projects">
        <LoadingProjectGrid />
      </HomeContent>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography color="error">Error loading projects</Typography>
      </Box>
    );
  }

  return (
    <HomeContent backgroundText="projects" title="My Projects">
      <ContentWrapper>
        <StyledContainer>
          {projects?.slice(0, 4).map((project, index) => (
            <AnimateCard 
              key={project.id} 
              index={index}
            >
              <ProjectCard project={project} />
            </AnimateCard>
          ))}
        </StyledContainer>
        <ViewMoreButtonComponent link="/projects" />
      </ContentWrapper>
    </HomeContent>
  );
};