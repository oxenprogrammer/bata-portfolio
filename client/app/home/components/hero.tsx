"use client";

import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { useMediaQuery, useTheme } from "@mui/material";
import Link from "next/link";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

// Layout wrapper to ensure proper content flow
const LayoutWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const MainContent = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

const HeroContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  minHeight: "calc(100vh - 64px)", // Subtract navbar height
  display: "flex",
  overflow: "hidden",
  backgroundColor: theme.palette.blue[70],
  flexGrow: 1, // Allow container to grow but maintain minimum height
  [theme.breakpoints.down("md")]: {
    minHeight: "100vh",
  },
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "relative",
  zIndex: 2,
  padding: theme.spacing(4, 2),
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    justifyContent: "center",
  },
}));

const TextContent = styled(Box)(({ theme }) => ({
  color: theme.palette.common.white,
  maxWidth: "600px",
  animation: `${fadeIn} 1s ease-out`,
  "& > *": {
    animation: `${slideIn} 1s ease-out`,
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: 0,
  top: 0,
  width: "50%",
  height: "100%",
  backgroundColor: theme.palette.common.white,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    opacity: 0.1,
  },
}));

const StyledImage = styled("div")<{ url: string }>(({ url }) => ({
  width: "100%",
  height: "100%",
  backgroundImage: `url(${url})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.teal[50],
  color: theme.palette.common.white,
  padding: theme.spacing(1.5, 4),
  borderRadius: "4px",
  textTransform: "none",
  marginRight: theme.spacing(2),
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.teal[60],
    transform: "translateY(-2px)",
  },
}));

const OutlineButton = styled(StyledButton)(({ theme }) => ({
  backgroundColor: "transparent",
  border: `2px solid ${theme.palette.teal[50]}`,
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: theme.palette.teal[60],
  },
}));

// Layout component that wraps the entire application
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LayoutWrapper>
      <MainContent>{children}</MainContent>
    </LayoutWrapper>
  );
};

const Hero: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Layout>
      <HeroContainer>
        <ImageContainer>
          <StyledImage url="/images/profile.svg" />
        </ImageContainer>
        
        <ContentContainer>
          <TextContent>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "4rem", md: "10rem", lg: "13.7rem" },
                fontWeight: 700,
                mb: 1,
              }}
            >
              <Box component="span" sx={{ color: theme.palette.common.white }}>
                HEL
              </Box>
              <Box component="span" sx={{ color: theme.palette.teal[50] }}>
                LO,
              </Box>
            </Typography>

            <Typography variant="h4" sx={{ mb: 1, opacity: 0.9 }}>
              I&apos;m
            </Typography>
            
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 700,
                mb: 2,
              }}
            >
              BATA IBRAHIM.
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: theme.palette.teal[50],
                mb: 4,
                fontSize: { xs: "1.2rem", md: "1.5rem" },
              }}
            >
              A versatile and results-driven Businessman.
            </Typography>

            <Box sx={{ display: "flex", gap: 2, justifyContent: isMobile ? "center" : "flex-start" }}>
              <Link href="/contact" style={{ textDecoration: "none" }}>
                <StyledButton>REACH OUT</StyledButton>
              </Link>
              <Link href="/resume" style={{ textDecoration: "none" }}>
                <OutlineButton>RESUME</OutlineButton>
              </Link>
            </Box>
          </TextContent>
        </ContentContainer>
      </HeroContainer>
    </Layout>
  );
};

export default Hero;