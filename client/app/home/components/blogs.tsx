"use client";

import { useQuery } from "@tanstack/react-query";
import { Box, Typography, styled } from "@mui/material";
import { getBlogs } from "@/app/api/blogs";
import { ViewMoreButtonComponent } from "@/app/shared/components/view-more-button";
import {
  AnimateCard,
  BlogCard,
  LoadingBlogGrid,
} from "@/app/shared/components";

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
  maxWidth: theme.breakpoints.values.xl,
  margin: "0 auto",
  padding: theme.spacing(2),
  width: "100%",
  background: "linear-gradient(135deg, #121619 0%, #1a2833 100%)",
}));

const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),
  width: "100%",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
  background: "linear-gradient(135deg, #121619 0%, #1a2833 100%)",
}));

export const BlogsSection = () => {
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    staleTime: 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <ContentWrapper>
        <Typography
          variant="h2"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: {
              xs: "64px",
              sm: "80px",
              md: "96px",
            },
            lineHeight: 1.5,
          }}
        >
          Blog
        </Typography>
        <StyledContainer>
          <LoadingBlogGrid />;
        </StyledContainer>
        <ViewMoreButtonComponent link="/blogs" />
      </ContentWrapper>
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
    <ContentWrapper>
      <Typography
        variant="h2"
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: {
            xs: "64px",
            sm: "80px",
            md: "96px",
          },
          lineHeight: 1.5,
        }}
      >
        Blog
      </Typography>
      <StyledContainer>
        {blogs?.slice(0, 3).map((blog, index) => (
          <AnimateCard key={blog.id} index={index}>
            <BlogCard blog={blog} />
          </AnimateCard>
        ))}
      </StyledContainer>
      <ViewMoreButtonComponent link="/blogs" />
    </ContentWrapper>
  );
};
