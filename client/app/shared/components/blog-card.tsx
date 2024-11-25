import { Card, Typography, Box, styled } from "@mui/material";
import Link from "next/link";
import { Blog } from "../types";

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  height: "300px",
  width: "300px",
  overflow: "hidden",
  cursor: "pointer",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
  [theme.breakpoints.down("md")]: {
    height: "400px",
    width: "400px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "300px",
    width: "350px",
  },
}));

const CardOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  background:
    "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
  padding: theme.spacing(3),
  color: theme.palette.common.white,
}));

const BlogImage = styled(Box)(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

interface BlogCardProps {
  blog: Blog;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <Link href={`/blogs/${blog.id}`} style={{ textDecoration: "none" }}>
      <StyledCard>
        <BlogImage sx={{ backgroundImage: `url(${blog.images[0]})` }} />
        <CardOverlay>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            {blog.title}
          </Typography>
          <Typography
            sx={{
              opacity: 0.9,
            }}
          >
            {blog.description}
          </Typography>
        </CardOverlay>
      </StyledCard>
    </Link>
  );
};
