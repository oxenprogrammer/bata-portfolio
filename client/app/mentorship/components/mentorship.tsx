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
  Tooltip,
} from "@mui/material";
import { Person, School, Send as SendIcon } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
// import { TestimonialCards } from "./testimonials";
import { useMutation } from "@tanstack/react-query";
import { mentorSignupApi, UserType } from "@/app/api/mentorship";
import Link from "next/link";

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
  const MENTOR_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSejqjrsQGU887SSf4x3OvSMyl17bblDkb5G915RyByi3eqNXQ/viewform";
  const MENTEE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeShmb3P0sG93-zW9-dT0nVmgB7LGbgpFXk2TX2rM8pEIjlRQ/viewform";

  const [showToast, setShowToast] = useState(false);
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const mutation = useMutation({
    mutationFn: mentorSignupApi,
    onMutate: () => {
      setButtonState("loading");
    },
    onSuccess: () => {
      setShowToast(true);
      setButtonState("success");

      // Open the appropriate Google form in a new tab
      const formUrl = userType === UserType.MENTOR ? MENTOR_FORM_URL : MENTEE_FORM_URL;
      window.open(formUrl, '_blank');

      setTimeout(() => {
        setShowToast(false);
      }, 8000);
    },
    onError: (error) => {
      console.error("Error subscribing to mentorship series:", error);
      setButtonState("idle");
    },
  });

  {showToast && (
    <Box
      sx={{
        mt: 2,
        p: 2,
        bgcolor: 'teal.50',
        borderRadius: 1,
        color: 'teal.900'
      }}
    >
      <Typography>
        Thanks for signing up! Please complete your registration on the Google form that opened in a new tab.
      </Typography>
    </Box>
  )}
  const handleSignup = () => {
    if (email && userType) {
      mutation.mutate({
        email,
        userType,
      });
    }
  };

  const images = [
    "/images/profile_picture_2.jpg",
    // "/images/mentorship2.webp",
    // "/images/mentorship3.webp",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);

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
        // alignItems="center"
        padding={theme.spacing(4)}
      >
        <Box flex={1}>
          <Typography
            sx={({ palette }) => ({ color: palette.teal[80] })}
            variant="h5"
            gutterBottom
          >
            Mentorship Program: Learn, Grow, Lead
          </Typography>
          <Typography gutterBottom>
          Are you looking to refine your skills, expand your network, and gain practical knowledge in communications and branding? Join my 6-month mentorship program designed to equip mentees with hands-on experience while providing mentors a platform to give back and shape the next generation of African communicators.
Our structured <Link style={{fontWeight: "bold"}} href={'https://docs.google.com/spreadsheets/d/1G3Y9U2hYdDNygT0HplkeZYEGS5epgf5hXqPKE2JRfDE/edit?gid=0#gid=0'} target="_blank">mentorship curriculum</Link> ensures that both mentors and mentees engage in meaningful learning, practical exercises, and career-enhancing discussions.

          </Typography>
          <Typography gutterBottom>
          💡 Ready to take the next step?
          </Typography>

          <Box mt={2} mb={2}>
            <Typography sx={({ palette }) => ({ color: palette.teal[80] })} gutterBottom>
            Click below to <strong>sign up as a mentor or mentee</strong> and start your journey today!

            </Typography>
            <ToggleButtonGroup
              value={userType}
              exclusive
              onChange={(_, newUserType) => setUserType(newUserType)}
              fullWidth
            >
              <ToggleButton sx={({ palette }) => ({ backgroundColor: palette.teal[80] })} value={UserType.MENTOR}>
                <Person sx={{ mr: 1 }} /> Mentor
              </ToggleButton>
              <ToggleButton sx={({ palette }) => ({ backgroundColor: palette.teal[80] })} value={UserType.MENTEE}>
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
                    color: theme.palette.gray[80],
                    "&.Mui-focused": {
                      color: theme.palette.teal[90],
                    },
                    "&.Mui-error": {
                      color: theme.palette.error.main,
                    },
                  },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.palette.gray[100],
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.teal[90],
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.teal[90],
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
                    <Tooltip
                      title={!isValidEmail(email) ? "Incorrect Email" : ""}
                      placement="top"
                    >
                      <span>
                        <Button
                          onClick={handleSignup}
                          disabled={!isValidEmail(email)}
                          sx={{
                            backgroundColor:
                              buttonState === "loading"
                                ? `${theme.palette.teal[80]} !important`
                                : `${theme.palette.teal[90]} !important`,
                            color: `${theme.palette.white} !important`,
                            "&:hover": {
                              backgroundColor:
                                buttonState === "loading"
                                  ? `${theme.palette.teal[80]} !important`
                                  : `${theme.palette.teal[70]} !important`,
                            },
                            "&:disabled": {
                              backgroundColor: `${theme.palette.teal[50]} !important`,
                              color: `${theme.palette.gray[30]} !important`,
                              cursor: "not-allowed !important",
                            }
                          }}
                        >
                          Sign Up
                        </Button>
                      </span>
                    </Tooltip>
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
          height="800px"
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
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                />
              </Box>
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
      {/* <TestimonialCards /> */}
    </Container>
  );
};
