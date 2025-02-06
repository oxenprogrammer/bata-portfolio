"use client";

import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { usePathname } from "next/navigation";
import {
  EmailIcon,
  FacebookIcon,
  LinkedInIcon,
  TwitterIcon,
} from "../shared/icons";
import { Newsletter, SocialLink, Contact } from "../shared/components";

const StyledFooter = styled("footer")(({ theme }) => ({
  position: "relative",
  width: "100%",
  bottom: 0,
  marginTop: "auto",
  padding: theme.spacing(4, 0),
  backgroundColor: theme.palette.blue[100], // Dark bluish background
  color: "#a0aec0", // Grayish text color
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const StyledContainer = styled(Container)(() => ({
  "& hr": {
    borderColor: "rgba(255, 255, 255, 0.1)", // Subtle divider color
  },
}));

const SocialLinksContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  justifyContent: "center",
  [theme.breakpoints.up("sm")]: {
    marginLeft: "auto",
  },
  "& svg": {
    color: "#a0aec0", // Match text color
    transition: "color 0.2s ease-in-out",
    "&:hover": {
      color: "#fff", // Brighten on hover
    },
  },
}));

const Copyright = styled(Typography)(({ theme }) => ({
  color: "#a0aec0",
  textAlign: "center",
  alignSelf: "center",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    textAlign: "left",
  },
}));

const BottomSection = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  paddingTop: theme.spacing(3),
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

const socialLinks = [
  { icon: <TwitterIcon />, href: "https://x.com/ibatambuze" },
  { icon: <LinkedInIcon />, href: "https://www.linkedin.com/in/ibatambuze/" },
  { icon: <EmailIcon />, href: "mailto:ibrahimbatambuze@gmail.com" },
  // { icon: <FacebookIcon />, href: "https://www.youtube.com/@IbrahimBatambuze" },
];

// Styled wrapper for Newsletter and Contact components
const ContentWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  "& input": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "#fff",
    "&::placeholder": {
      color: "#a0aec0",
    },
  },
  "& button": {
    backgroundColor: "#2d3748",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#4a5568",
    },
  },
}));

const Footer: React.FC = () => {
  const pathname = usePathname();
  const showContact = ["/about", "/mentorship"].includes(pathname);

  return (
    <StyledFooter>
      <StyledContainer maxWidth="lg">
        {/* Conditional Rendering Section */}
        <ContentWrapper>
          {showContact ? <Contact /> : <Newsletter />}
        </ContentWrapper>

        {/* Bottom Section */}
        <BottomSection>
          <Copyright>© 2024 bata.com, All rights reserved.</Copyright>

          <SocialLinksContainer>
            {socialLinks.map((link, index) => (
              <SocialLink key={index} href={link.href} icon={link.icon} />
            ))}
          </SocialLinksContainer>
        </BottomSection>
      </StyledContainer>
    </StyledFooter>
  );
};

export default Footer;
