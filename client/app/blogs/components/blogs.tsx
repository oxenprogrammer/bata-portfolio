"use client";

import { useQuery } from "@tanstack/react-query";
import { Box, Typography, styled } from "@mui/material";
import { getBlogs } from "@/app/api/blogs";
import {
  AnimateCard,
  BlogCard,
  LoadingBlogGrid,
  Pagination,
} from "@/app/shared/components";
import { useState } from "react";

const ITEMS_PER_PAGE = 6;

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
}));

const StyledContainer = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "1fr",
    justifyItems: "center",
    alignItems: "center", 
    gap: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(3, auto)",
    },
  }));

export const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);

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
          <LoadingBlogGrid />
        </StyledContainer>
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

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBlogs = blogs?.slice(startIndex, endIndex);

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
        {currentBlogs?.map((blog, index) => (
          <AnimateCard key={blog.id} index={index}>
            <BlogCard blog={blog} />
          </AnimateCard>
        ))}
      </StyledContainer>
      <Pagination
        totalItems={blogs?.length || 0}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </ContentWrapper>
  );
};
