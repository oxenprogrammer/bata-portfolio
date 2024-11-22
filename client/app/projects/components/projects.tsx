"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  styled,
  Typography,
  IconButton,
  InputBase,
  Container,
} from "@mui/material";
import { getProjects } from "@/app/api/projects";
import HomeContent from "@/app/shared/components/home-content";
import { LoadingProjectGrid, Pagination } from "@/app/shared/components";
import SearchIcon from "@mui/icons-material/Search";
import { ProjectFilter } from "./project-filter";
import ProjectCard from "./project-card";

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

const SearchBar = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: "400px",
  display: "flex",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  flex: 1,
  marginLeft: theme.spacing(1),
}));

const SearchButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  const filteredProjects = projects?.filter((project) => {
    const matchesCategory =
      activeFilter === "All" || project.categories.includes(activeFilter);

    const searchLower = searchText.toLowerCase();
    const matchesSearch =
      searchText === "" ||
      project.title.toLowerCase().includes(searchLower) ||
      project.categories.some((category) =>
        category.toLowerCase().includes(searchLower)
      );

    return matchesCategory && matchesSearch;
  });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProjects = filteredProjects?.slice(startIndex, endIndex);

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

  return (
    <Container
      sx={{ ddisplay: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <SearchBar>
          <SearchInput
            placeholder="Search projects..."
            inputProps={{ "aria-label": "search" }}
            value={searchText}
            onChange={handleSearch}
          />
          <SearchButton type="button" aria-label="search">
            <SearchIcon />
          </SearchButton>
        </SearchBar>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            mb: 2,
          }}
        >
          <ProjectFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            sx={({ breakpoints }) => ({
              position: "sticky",
              zIndex: 1,
              width:{
                xs: "100%",
                md: "80%",
              },
              top: "64px",
              marginTop: "100px",
              [breakpoints.down(678)]: { display: "none" },
            })}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {filteredProjects?.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
                <Typography>
                  No projects found matching your criteria
                </Typography>
              </Box>
            ) : (
              <StyledContainer>
                {currentProjects?.map((project, index) => (
                  <ProjectCard key={project.id || index} {...project} />
                ))}
              </StyledContainer>
            )}
          </Box>
        </Box>

        <Pagination
          totalItems={projects?.length || 0}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </Box>
    </Container>
  );
};
