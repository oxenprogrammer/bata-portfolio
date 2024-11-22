"use client";
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Box, styled, Typography, IconButton, InputBase } from "@mui/material";
import { getProjects } from "@/app/api/projects";
import HomeContent from "@/app/shared/components/home-content";
import { LoadingProjectGrid, Pagination } from "@/app/shared/components";
import { useRouter } from "next/navigation";
import { ChevronRightRounded } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { ProjectFilter } from './project-filter';

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
  display: 'flex',
  alignItems: 'center',
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
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
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
  };

  const filteredProjects = projects?.filter((project) => {
    if (activeFilter === "All") return true;
    return project.categories.includes(activeFilter);
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
    <>
      <SearchBar>
        <SearchInput
          placeholder="Search projects..."
          inputProps={{ 'aria-label': 'search' }}
          value={searchText}
          onChange={handleSearch}
        />
        <SearchButton type="button" aria-label="search">
          <SearchIcon />
        </SearchButton>
      </SearchBar>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <ProjectFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        <StyledContainer>
          {currentProjects?.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </StyledContainer>
      </Box>

      <Pagination
        totalItems={projects?.length || 0}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

interface ProjectCardProps {
  images: string[];
  date?: string;
  title: string;
  description: string | null;
}

const CardContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover $imageContainer': {
    filter: 'grayscale(100%)',
  },
}));

const ImageContainer = styled(Box)(() => ({
  position: 'relative',
  width: '100%',
  paddingTop: '60%',
  overflow: 'hidden',
  cursor: 'pointer',
  '& img': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'filter 0.3s ease',
    filter: 'grayscale(0%)',
  },
  '&:hover img': {
    filter: 'grayscale(100%)',
  },
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  flex: '1 1 auto',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const DateText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  marginBottom: theme.spacing(1),
}));

const TitleText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.125rem',
  marginBottom: theme.spacing(1),
}));

const DescriptionText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const ActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  color: theme.palette.primary.main,
  cursor: 'pointer',
  '& svg': {
    marginLeft: theme.spacing(1),
  },
}));

const ProjectCard: React.FC<ProjectCardProps> = ({ images, title, description }) => {
  const router = useRouter();

  const handleImageClick = () => {
    // Redirect to project details page
    router.push(`/projects/${title.toLowerCase().replace(/\s/g, '-')}`);
  };

  return (
    <CardContainer>
      <ImageContainer onClick={handleImageClick}>
        <img src={images[0]} alt={title} />
      </ImageContainer>
      <ContentContainer>
        <Box>
          <DateText>66666666666</DateText>
          <TitleText>{title}</TitleText>
          <DescriptionText>{description}</DescriptionText>
        </Box>
        <ActionContainer onClick={handleImageClick}>
          View Project <ChevronRightRounded />
        </ActionContainer>
      </ContentContainer>
    </CardContainer>
  );
};

export default ProjectCard;