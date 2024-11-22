"use client";
import { useQuery } from "@tanstack/react-query";
import { Box, styled, Typography } from "@mui/material";
import { getProjects } from "@/app/api/projects";

const FilterContainer = styled(Box)(({ theme }) => ({
  position: "sticky",
  top: theme.spacing(2),
  width: 200,
  marginRight: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  padding: theme.spacing(2),
}));

const FilterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
}));

const FilterOption = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['background-color', 'color']),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const FilterCount = styled(Typography)(() => ({
  marginLeft: 'auto',
  fontSize: '0.75rem',
  color: 'inherit',
  opacity: 0.8,
}));

interface DataFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const ProjectFilter: React.FC<DataFilterProps> = ({ activeFilter, onFilterChange }) => {
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });

  // Get unique categories and their counts
  const categoryStats = projects?.reduce((acc, project) => {
    project.categories.forEach(category => {
      acc[category] = (acc[category] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>) ?? {};

  // Add "All" category with total project count
  const allFilters = {
    All: projects?.length ?? 0,
    ...categoryStats
  };

  return (
    <FilterContainer>
      <FilterTitle>Filters</FilterTitle>
      {Object.entries(allFilters).map(([category, count]) => (
        <FilterOption
          key={category}
          onClick={() => onFilterChange(category)}
          sx={{
            backgroundColor:
              activeFilter === category ? "primary.main" : "transparent",
            color:
              activeFilter === category ? "common.white" : "text.primary",
          }}
        >
          <Typography
            sx={{
              fontSize: '0.875rem',
              fontWeight: activeFilter === category ? 'medium' : 'regular',
            }}
          >
            {category}
          </Typography>
          <FilterCount>
            ({count})
          </FilterCount>
        </FilterOption>
      ))}
    </FilterContainer>
  );
};

// Optional: Export these utilities if you need them elsewhere
export const getUniqueCategories = (projects: Array<{ categories: string[] }>) => {
  const categoriesSet = new Set<string>();
  projects?.forEach(project => {
    project.categories.forEach(category => {
      categoriesSet.add(category);
    });
  });
  return Array.from(categoriesSet);
};

export const getCategoryCounts = (projects: Array<{ categories: string[] }>) => {
  return projects?.reduce((acc, project) => {
    project.categories.forEach(category => {
      acc[category] = (acc[category] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);
};