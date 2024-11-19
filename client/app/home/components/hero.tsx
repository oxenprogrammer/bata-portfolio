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

const imageFadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(1.1);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

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
  minHeight: "calc(100vh - 64px + 60px)",
  display: "flex",
  overflow: "hidden",
  backgroundColor: "#18202b",
  flexGrow: 1,
  [theme.breakpoints.down("md")]: {
   top: "-9px",
   marginBottom: "-9px",
  },
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "relative",
  zIndex: 2,
  padding: theme.spacing(4, 0),
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
  top: "-60px",
  width: "50%",
  height: "calc(100% + 60px)",
  backgroundColor: theme.palette.common.white,
  animation: `${imageFadeIn} 1.5s ease-out`,
  [theme.breakpoints.down("md")]: {
    height: "calc(100% + 100px)",
    width: "100%",
    opacity: 0.9,
    top: "-100px",
  },
}));

const StyledImage = styled("div")<{ url: string }>(({ url }) => ({
  width: "100%",
  height: "100%",
  backgroundImage: `url(${url})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  animation: `${imageFadeIn} 1.5s ease-out`,
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

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LayoutWrapper>
      <MainContent>{children}</MainContent>
    </LayoutWrapper>
  );
};

export const HeroSection: React.FC = () => {
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
              How
              </Box>
              <Box component="span" sx={{ color: theme.palette.teal[50] }}>
                dy,
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
              Ibrahim W. Batambuze.
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: theme.palette.teal[50],
                mb: 4,
                fontSize: { xs: "1.2rem", md: "1.5rem" },
              }}
            >
              A Strategic Communications Advisor.
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