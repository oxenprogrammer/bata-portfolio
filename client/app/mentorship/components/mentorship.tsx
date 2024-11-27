"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const Mentorship = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(700));

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "/images/mentorship.png",
    "/images/mentorship2.png",
    "/images/mentorship3.png",
    "/images/mentorship5.jpg",
    "/images/mentorship6.webp",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const imageVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        alignItems="center"
        padding={theme.spacing(4)}
      >
        <Box flex={1}>
          <Typography variant="h4" gutterBottom>
            Mentorship Series
          </Typography>
          <Typography gutterBottom>
            In a world full of uncertainty, navigating career paths and your
            future can be daunting. That's why we've curated a series of free
            mentorship sessions designed to provide guidance, support, and
            invaluable insights to help you chart a successful and fulfilling
            career path.
          </Typography>
          <Typography gutterBottom>
            Subscribe to our mailing list, and get notified when we have the
            get-togethers with mentors from around the world.
          </Typography>
          <Box component="form" noValidate autoComplete="off" mt={4}>
            <TextField
              id="email"
              label="Email Address"
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: <Button endIcon={<SendIcon />}>Sign Up</Button>,
              }}
            />
          </Box>
        </Box>
        <Box
          flex={1}
          marginLeft={isMobile ? 0 : theme.spacing(4)}
          position="relative"
          overflow="hidden"
          height="300px"
          width="100%"
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={currentIndex}
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
              }}
            >
              <Box
                sx={{
                  "& img": {
                    transition: "filter 0.3s ease",
                    filter: "grayscale(0%)",
                  },
                  "&:hover img": { filter: "grayscale(100%)" },
                }}
              >
                <Image
                  src={images[currentIndex]}
                  alt={`Mentorship Series Image ${currentIndex + 1}`}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </Box>
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </Container>
  );
};
