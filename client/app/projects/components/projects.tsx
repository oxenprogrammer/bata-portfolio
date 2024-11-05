"use client";
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Box, styled } from "@mui/material";
import { getProjects } from "@/app/api/projects";
import HomeContent from "@/app/shared/components/home-content";
import { AnimateCard, LoadingProjectGrid, Pagination, ProjectCard } from "@/app/shared/components";

const ITEMS_PER_PAGE = 4;

const StyledContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(1),
  width: "100%",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
}));

export const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
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
      <HomeContent backgroundText="projects" title="My Projects">
        <Box sx={{ textAlign: "center", py: 8, color: "error.main" }}>
          Error loading projects
        </Box>
      </HomeContent>
    );
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProjects = projects?.slice(startIndex, endIndex);

  return (
    <HomeContent backgroundText="projects" title="My Projects">
      <StyledContainer>
        {currentProjects?.map((project, index) => (
          <AnimateCard 
            key={project.id} 
            index={index}
          >
            <ProjectCard project={project} />
          </AnimateCard>
        ))}
      </StyledContainer>
      
      <Pagination
        totalItems={projects?.length || 0}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </HomeContent>
  );
};