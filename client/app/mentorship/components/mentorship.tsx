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
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { Person, School, Send as SendIcon } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { TestimonialCards } from "./testimonials";
import { useMutation } from "@tanstack/react-query";
import { mentorSignupApi, UserType } from "@/app/api/mentorship";

export const Mentorship = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(700));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<
    (typeof UserType)[keyof typeof UserType] | null
  >(null);
  const [buttonState, setButtonState] = useState<
    "idle" | "loading" | "success"
  >("idle");
  const [showToast, setShowToast] = useState(false);

  const mutation = useMutation({
    mutationFn: mentorSignupApi,
    onMutate: () => {
      setButtonState("loading");
    },
    onSuccess: () => {
      setShowToast(true);
      setButtonState("success");
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    },
    onError: (error) => {
      console.error("Error subscribing to mentorship series:", error);
      setButtonState("idle");
    },
  });

  const handleSignup = () => {
    if (email && userType) {
      mutation.mutate({
        email,
        userType,
      });
    }
  };

  const images = [
    "/images/mentorship1.webp",
    // "/images/mentorship2.webp",
    // "/images/mentorship3.webp",
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
    <Container sx={{ paddingY: theme.spacing(4) }}>
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        alignItems="center"
        padding={theme.spacing(4)}
      >
        <Box flex={1}>
          <Typography
            sx={({ palette }) => ({ color: palette.orange[60] })}
            variant="h4"
            gutterBottom
          >
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

          <Box mt={2} mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              I want to sign up as a:
            </Typography>
            <ToggleButtonGroup
              value={userType}
              exclusive
              onChange={(_, newUserType) => setUserType(newUserType)}
              fullWidth
            >
              <ToggleButton value={UserType.MENTOR}>
                <Person sx={{ mr: 1 }} /> Mentor
              </ToggleButton>
              <ToggleButton value={UserType.MENTEE}>
                <School sx={{ mr: 1 }} /> Mentee
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {userType && (
            <Box component="form" noValidate autoComplete="off" mt={2}>
              <TextField
                id="email"
                label="Email Address"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: theme.palette.gray[50],
                    "&.Mui-focused": {
                      color: theme.palette.orange[60],
                    },
                    "&.Mui-error": {
                      color: theme.palette.error.main,
                    },
                  },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.palette.gray[100],
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.orange[60],
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.orange[60],
                    },
                    "&.Mui-focused": {
                      backgroundColor: theme.palette.primary.main,
                    },
                  },
                  "& .MuiInputBase-input": {
                    backgroundColor: "transparent",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={handleSignup}
                      disabled={!email}
                      sx={{
                        backgroundColor:
                          buttonState === "loading"
                            ? `${theme.palette.orange[50]} !important`
                            : `${theme.palette.orange[60]} !important`,
                        color: `${theme.palette.white} !important`,
                        "&:hover": {
                          backgroundColor:
                            buttonState === "loading"
                              ? `${theme.palette.orange[50]} !important`
                              : `${theme.palette.orange[40]} !important`,
                        },
                      }}
                    >
                      Sign Up
                    </Button>
                  ),
                }}
              />
            </Box>
          )}
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
      <TestimonialCards />
    </Container>
  );
};
