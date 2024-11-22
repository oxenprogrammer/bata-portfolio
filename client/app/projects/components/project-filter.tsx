"use client";
import { Box, styled, Typography } from "@mui/material";

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
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const FilterIcon = styled(Box)(({ theme }) => ({
  width: 16,
  height: 16,
  marginRight: theme.spacing(1),
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
}));

interface DataFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const ProjectFilter: React.FC<DataFilterProps> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { label: "All", icon: "" },
    { label: "Data Artistry", icon: "" },
    { label: "Data Products", icon: "" },
    { label: "Data Trainings", icon: "" },
    { label: "Data Governance", icon: "" },
    { label: "Data Rights and Safety", icon: "" },
  ];

  return (
    <FilterContainer>
      <FilterTitle>Filters</FilterTitle>
      {filters.map((filter, index) => (
        <FilterOption
          key={index}
          onClick={() => onFilterChange(filter.label)}
          sx={{
            backgroundColor:
              activeFilter === filter.label ? "primary.main" : "transparent",
            color:
              activeFilter === filter.label ? "common.white" : "text.primary",
          }}
        >
          <FilterIcon
            sx={{
              backgroundImage: `url('/icons/${filter.icon}.svg')`,
            }}
          />
          <Typography>{filter.label}</Typography>
        </FilterOption>
      ))}
    </FilterContainer>
);
};