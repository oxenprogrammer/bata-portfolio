"use client";
import React from "react";
import { Box, Container, Link, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import {
  EmailIcon,
  FacebookIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/app/shared/icons";
import { SocialLink } from "@/app/shared/components";

const AboutContainer = styled(Container)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(12, 2),
  overflow: "hidden",
}));

const BackgroundText = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(6),
  left: "7px",
  fontSize: "120px",
  fontWeight: 700,
  color: "transparent",
  WebkitTextStroke: `1px ${theme.palette.blue[90]}`,
  whiteSpace: "nowrap",
  userSelect: "none",
  opacity: 0.2,
  "@media (max-width: 600px)": {
    fontSize: "80px",
    left: 0,
    top: "70px",
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
    top: "58px",
    width: "100%",
    height: "1px",
    backgroundColor: theme.palette.gray[90],
    "@media (max-width: 600px)": {
      top: "44px",
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

const ContentText = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  lineHeight: 1.7,
  color: theme.palette.grey[700],
  marginBottom: theme.spacing(3),
  maxWidth: "800px",
}));

const socialLinks = [
  { icon: <TwitterIcon />, href: "https://twitter.com/bata" },
  { icon: <LinkedInIcon />, href: "https://linkedin.com/in/bata" },
  { icon: <EmailIcon />, href: "mailto:contact@bata.com" },
  { icon: <FacebookIcon />, href: "mailto:contact@bata.com" },
];

const AboutSection = () => {
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
      <AboutContainer maxWidth="lg">
        <BackgroundText
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={backgroundTextVariants}
        >
          ABOUT
        </BackgroundText>

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <TitleWrapper>
            <Title
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={titleVariants}
            >
              About Me
            </Title>
          </TitleWrapper>

          <ContentText>
            Lorem ipsum dolor amet, consectetuer adipiscing elit. Curabitur
            parturient ornare iaculis libero ante venenatis. Cursus et
            scelerisque bibendum, habitasse inceptos taciti. In ultrices
            ridiculus class vestibulum quam leo velit conubia. Eleifend tempus
            primis vestibulum fames parturient.
          </ContentText>

          <ContentText>
            Lorem ipsum dolor amet, consectetuer adipiscing elit.
          </ContentText>

          <ContentText>
            Lorem ipsum dolor amet, consectetuer adipiscing elit. Aptent lacinia
            egestas ac conubia luctus facilisi congue pulvinar.
          </ContentText>

          <ContentText>
            Let&apos;s work together, send me a mail:{" "}
            <Link
              href="mailto:emeruchecole@gmail.com"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              emeruchecole@gmail.com
            </Link>
          </ContentText>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-start",
              marginLeft: {
                xs: "",
                sm: "auto",
              },
            }}
          >
            {socialLinks.map((link, index) => (
              <SocialLink key={index} href={link.href} icon={link.icon} />
            ))}
          </Box>
        </Box>
      </AboutContainer>
    </Box>
  );
};

export default AboutSection;
