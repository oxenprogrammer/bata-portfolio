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
import { motion, AnimatePresence } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import { getProjects } from "@/app/api/projects";
import HomeContent from "@/app/shared/components/home-content";
import {
  LoadingProjectGrid,
  NoResults,
  Pagination,
} from "@/app/shared/components";
import { ProjectFilter } from "./project-filter";
import ProjectCard from "./project-card";

const ITEMS_PER_PAGE = 4;

const StyledContainer = styled(motion.div)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(4),
  width: "100%",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
}));

const SearchBar = styled(motion.div)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: "400px",
  display: "flex",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid #fc6d46`,
  borderRadius: theme.borderRadii.xl,
  padding: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const searchBarVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 100,
    },
  },
};

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
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{ display: "flex", flexDirection: "column", marginBottom: 4 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: {
            xs: "flex-end",
            md: "space-between",
          },
          mb: 8,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
            color: "#fc6d46",
            fontWeight: "bolder",
          }}
        >
          projects
        </Typography>
        <SearchBar
          initial="hidden"
          animate="visible"
          variants={searchBarVariants}
        >
          <InputBase
            placeholder="Search projects by title or category"
            inputProps={{ "aria-label": "search" }}
            value={searchText}
            onChange={handleSearch}
            sx={{ flex: 1, marginLeft: 1 }}
          />
          <IconButton
            component={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            aria-label="search"
          >
            <SearchIcon sx={{ color: "#fc6d46" }} />
          </IconButton>
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
              width: {
                xs: "100%",
                md: "80%",
              },
              top: "72px",
              marginTop: "100px",
              [breakpoints.down(678)]: { display: "none" },
            })}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <AnimatePresence mode="wait">
              {filteredProjects?.length === 0 ? (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    paddingTop: 4,
                    paddingBottom: 4,
                    color: "text.secondary",
                  }}
                >
                  <NoResults />
                </motion.div>
              ) : (
                <StyledContainer variants={containerVariants}>
                  {currentProjects?.map((project, index) => (
                    <motion.div
                      key={project.id || index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ProjectCard {...project} />
                    </motion.div>
                  ))}
                </StyledContainer>
              )}
            </AnimatePresence>
          </Box>
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Pagination
            totalItems={projects?.length || 0}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </motion.div>
      </Box>
    </Container>
  );
};
