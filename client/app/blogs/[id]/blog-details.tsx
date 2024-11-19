"use client";
import { Box, Container, Typography, Button, styled, IconButton, Avatar, useTheme, useMediaQuery } from "@mui/material";
import { ArrowBack, AccessTime, Bookmark, Share, Favorite, Person, Update } from "@mui/icons-material";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

// Types
interface Blog {
  id: string;
  title: string;
  description: string;
  images: string[];
  link: string;
  createdBy: string;
  publishedAt: Date;
  updatedAt: Date;
  content: string;
}

// Styled components
const ProgressBar = styled(motion.div)(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '4px',
  background: '#2196f3',
  transformOrigin: '0%',
  zIndex: 1000,
}));

const BlogHeader = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(8, 0, 4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 0, 2),
  },
  background: theme.palette.background.paper,
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '500px',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
  [theme.breakpoints.down('sm')]: {
    height: '300px',
    borderRadius: theme.spacing(1),
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.02) 100%)',
    pointerEvents: 'none',
  }
}));

const ContentSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

const AuthorSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
}));

const MetaInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  color: theme.palette.text.secondary,
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1),
    fontSize: '0.875rem',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1rem',
  }
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(2),
  },
}));

interface BlogDetailsProps {
  blog: Blog;
}

export const BlogDetails = ({ blog }: BlogDetailsProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const readingTime = Math.ceil(blog.content.split(' ').length / 200);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const ContentImage = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: '400px',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      height: '250px',
      marginBottom: theme.spacing(3),
    },
  }));

  return (
    <>
      <ProgressBar style={{ scaleX: scrollProgress / 100 }} />
      
      <BlogHeader>
        <Container maxWidth="lg" sx={{ px: isMobile ? 2 : 3 }}>
          <Button
            component={Link}
            href="/blogs"
            startIcon={<ArrowBack />}
            sx={{ mb: isMobile ? 2 : 4 }}
          >
            Back to blogs
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography 
              variant={isMobile ? "h4" : "h3"}
              gutterBottom
              sx={{ 
                fontWeight: 700,
                maxWidth: '800px',
                mb: isMobile ? 2 : 4,
                fontSize: isMobile ? '1.75rem' : undefined,
                lineHeight: 1.2,
              }}
            >
              {blog.title}
            </Typography>

            <AuthorSection>
              <Avatar sx={{ width: isMobile ? 40 : 48, height: isMobile ? 40 : 48 }}>
                <Person />
              </Avatar>
              <Box sx={{ flex: isMobile ? 'auto' : 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {blog.createdBy}
                </Typography>
                <MetaInfo>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTime />
                    <Typography>
                      {readingTime} min read
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Update />
                    <Typography>
                      Updated {blog.updatedAt.toLocaleDateString()}
                    </Typography>
                  </Box>
                </MetaInfo>
              </Box>
              <ActionButtons>
                <IconButton 
                  onClick={() => setIsLiked(!isLiked)}
                  color={isLiked ? "primary" : "default"}
                  size={isMobile ? "small" : "medium"}
                >
                  <Favorite />
                </IconButton>
                <IconButton 
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  color={isBookmarked ? "primary" : "default"}
                  size={isMobile ? "small" : "medium"}
                >
                  <Bookmark />
                </IconButton>
                <IconButton size={isMobile ? "small" : "medium"}>
                  <Share />
                </IconButton>
              </ActionButtons>
            </AuthorSection>

            <ImageContainer>
              <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ height: '100%', width: '100%' }}
              >
                <Image
                  src={blog.images[0]}
                  alt={blog.title}
                  fill
                  style={{ 
                    objectFit: 'cover',
                  }}
                  priority
                />
              </motion.div>
            </ImageContainer>
          </motion.div>
        </Container>
      </BlogHeader>

      <Container maxWidth="lg" sx={{ px: isMobile ? 2 : 3 }}>
        <ContentSection>
          <motion.div {...fadeInUp}>
            <Typography 
              variant="subtitle1" 
              color="text.secondary" 
              sx={{ 
                mb: isMobile ? 2 : 4,
                fontSize: isMobile ? '1rem' : '1.2rem',
                lineHeight: 1.6,
                maxWidth: '800px'
              }}
            >
              {blog.description}
            </Typography>

            {blog.images.length > 1 && (
              <ContentImage>
                <Image
                    src={blog.images[1]}
                    alt={`${blog.title} - additional image`}
                    fill
                    style={{ 
                      objectFit: 'cover',
                    }}
                  />
              </ContentImage>
            )}

            <Typography 
              sx={{ 
                lineHeight: 1.8,
                fontSize: isMobile ? '1rem' : '1.1rem',
                maxWidth: '800px'
              }}
            >
              {blog.content}
            </Typography>
          </motion.div>
        </ContentSection>
      </Container>
    </>
  );
};