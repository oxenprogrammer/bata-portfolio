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
  mt: "auto",
  padding: theme.spacing(4, 0),
  backgroundColor: theme.palette.gray[10],
}));

const socialLinks = [
  { icon: <TwitterIcon />, href: "https://twitter.com/bata" },
  { icon: <LinkedInIcon />, href: "https://linkedin.com/in/bata" },
  { icon: <EmailIcon />, href: "mailto:contact@bata.com" },
  { icon: <FacebookIcon />, href: "mailto:contact@bata.com" },
];

const Footer: React.FC = () => {
  const pathname = usePathname();
  const showContact = ["/about", "/mentorship"].includes(pathname);

  return (
    <StyledFooter>
      <Container maxWidth="lg">
        {/* Conditional Rendering Section */}
        {showContact ? <Contact /> : <Newsletter />}

        {/* Bottom Section */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
            borderTop: "1px solid",
            borderColor: "divider",
            pt: 3,
            gap: 2,
          }}
        >
          <Typography
            sx={({ palette }) => ({
              color: palette.gray[60],
              textAlign: "center",
              alignSelf: "center",
              width: "100%",
            })}
          >
            © 2024 bata.com, All rights reserved.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
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
      </Container>
    </StyledFooter>
  );
};

export default Footer;
