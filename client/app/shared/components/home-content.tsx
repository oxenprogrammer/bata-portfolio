"use client";
import React from "react";
import { Box, Container } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";

const MainContainer = styled(Container)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(2),
  overflow: "hidden",
  backgroundColor: "white",
}));

const BackgroundText = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(-4),
  left: "7px",
  fontSize: "120px",
  fontWeight: 700,
  color: "transparent",
  WebkitTextStroke: `1px ${theme.palette.blue[90]}`,
  whiteSpace: "nowrap",
  userSelect: "none",
  textTransform: "uppercase",
  opacity: 0.2,
  "@media (max-width: 600px)": {
    fontSize: "67px",
    left: 0,
    top: "-10px",
  },
}));

const TitleWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  marginBottom: theme.spacing(8),
  paddingBottom: theme.spacing(2),
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    top: "70px",
    width: "100%",
    height: "1px",
    backgroundColor: theme.palette.gray[90],
    "@media (max-width: 600px)": {
      top: "52px",
    },
  },
}));

const Title = styled(motion.h2)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: 700,
  color: theme.palette.grey[900],
  margin: 0,
  "@media (max-width: 600px)": {
    fontSize: "2rem",
  },
}));

interface HomeContentProps {
  backgroundText?: string;
  title: string;
  children: React.ReactNode;
}

const HomeContent: React.FC<HomeContentProps> = ({
  backgroundText = "ABOUT",
  title = "About Me",
  children,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const currentRef = sectionRef.current;
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const backgroundTextVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 0.2,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  return (
    <Box component="section" sx={{ backgroundColor: "white" }} ref={sectionRef}>
      <MainContainer maxWidth="lg">
        <BackgroundText
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={backgroundTextVariants}
        >
          {backgroundText}
        </BackgroundText>

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <TitleWrapper>
            <Title
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={titleVariants}
            >
              {title}
            </Title>
          </TitleWrapper>
          
          {children}
        </Box>
      </MainContainer>
    </Box>
  );
};
export default HomeContent;