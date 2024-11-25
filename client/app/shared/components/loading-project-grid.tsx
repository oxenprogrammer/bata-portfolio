import { Box, Card, Container, styled } from "@mui/material";
import { keyframes } from "@mui/system";

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  height: "300px",
  overflow: "hidden",
  backgroundColor: theme.palette.grey[200],
  animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
  [theme.breakpoints.down("md")]: {
    height: "250px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "200px",
  },
}));

const CardOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(3),
  background: `linear-gradient(to top, ${theme.palette.grey[300]} 0%, ${theme.palette.grey[300]}80 60%, transparent 100%)`,
}));

const SkeletonText = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  borderRadius: theme.shape.borderRadius,
}));

const ProjectSkeleton = () => {
  return (
    <StyledCard>
      <CardOverlay>
        <SkeletonText sx={{ height: 28, width: "75%", mb: 1 }} />
        <SkeletonText sx={{ height: 20, width: "100%" }} />
      </CardOverlay>
    </StyledCard>
  );
};

export const LoadingProjectGrid = () => {
  return (
    <Container
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(2, 1fr)",
        },
        gap: 2,
        width: "100%",
      }}
    >
      {[...Array(4)].map((_, index) => (
        <ProjectSkeleton key={index} />
      ))}
    </Container>
  );
};
