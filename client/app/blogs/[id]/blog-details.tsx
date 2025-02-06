"use client";
import {
  Button,
  Box,
  Container,
  Typography,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  AccessTime,
  ArrowBack,
} from "@mui/icons-material";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { Blog } from "@/app/api/blogs";
import Link from "next/link";

export const BlogDetails = ({ blog }: { blog: Blog }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const [isBookmarked, setIsBookmarked] = useState(false);
  // const [isLiked, setIsLiked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (!isBrowser) return;

    const updateReadingProgress = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener("scroll", updateReadingProgress);
    return () => window.removeEventListener("scroll", updateReadingProgress);
  }, [isBrowser]);

  const sanitizedContent = DOMPurify.sanitize(blog.content);
  const readingTime = Math.ceil(blog.content.split(/\s+/).length / 200);

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.toLocaleDateString("en-US", { year: "numeric" });
    return { month, year };
  };

  const { month, year } = formatDate(blog.publishedAt);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Reading Progress Bar */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: theme.palette.white,
          transformOrigin: "0%",
          scaleX: readingProgress / 100,
          zIndex: 15,
        }}
      />

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: isMobile ? "30vh" : "50vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Image
          key={blog.images[0].url}
          src={blog.images[0].url}
          alt={blog.title}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
            padding: theme.spacing(4),
            color: "white",
          }}
        >
          <Container maxWidth="lg">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Typography
                variant={isMobile ? "h4" : "h2"}
                fontWeight="bold"
                mb={2}
              >
                {blog.title}
              </Typography>

              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                {blog.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.2)",
                      color: "white",
                    }}
                  />
                ))}
              </Box>
            </motion.div>
          </Container>
        </Box>
      </Box>
      <Box
        sx={{
          position: "sticky",
          top: theme.spacing(8),
          zIndex: theme.zIndex.appBar + 1,
          mb: 2,
        }}
      >
        <Container>
          <Button
            component={Link}
            href="/blogs"
            startIcon={<ArrowBack />}
            sx={{ color: theme.palette.white, backgroundColor: theme.palette.teal[90], '&:hover': { backgroundColor: theme.palette.teal[80] } }}
          >
            Back to Blogs
          </Button>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: "flex", gap: 4 }}>
          {/* Main Content */}
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                p: 4,
                mb: 4,
                boxShadow: theme.shadows[1],
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(blog.description),
                }}
                style={{
                  lineHeight: 1.8,
                  fontSize: isMobile ? "1rem" : "1.1rem",
                  color: theme.palette.text.secondary,
                  marginBottom: theme.spacing(4),
                }}
              />

              <div
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                style={{
                  lineHeight: 1.8,
                  fontSize: isMobile ? "1rem" : "1.1rem",
                }}
              />
            </Box>
          </Box>

          {/* Sidebar */}
          {!isMobile && (
            <Box sx={{ width: 300 }}>
              <Box
                sx={{
                  position: "sticky",
                  top: theme.spacing(4),
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 2,
                  p: 3,
                  boxShadow: theme.shadows[1],
                }}
              >
                <Typography variant="h6" mb={2}>
                  Article Info
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography color="text.secondary">
                    <AccessTime
                      sx={{ fontSize: 16, mr: 1, verticalAlign: "middle" }}
                    />
                    {readingTime} min read
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography color="text.secondary">
                    Published: {month}, {year}
                  </Typography>
                </Box>

                {/* <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton onClick={() => setIsLiked(!isLiked)}>
                    {isLiked ? (
                      <Favorite color="primary" />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>
                  <IconButton onClick={() => setIsBookmarked(!isBookmarked)}>
                    {isBookmarked ? (
                      <Bookmark color="primary" />
                    ) : (
                      <BookmarkBorder />
                    )}
                  </IconButton>
                  <IconButton>
                    <Share />
                  </IconButton>
                </Box> */}
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </motion.div>
  );
};
