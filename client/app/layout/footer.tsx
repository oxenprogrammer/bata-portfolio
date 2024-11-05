"use client";

import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";
import {
  EmailIcon,
  FacebookIcon,
  LinkedInIcon,
  TwitterIcon,
} from "../shared/icons";
import { SocialLink } from "../shared/components";

const StyledFooter = styled("footer")(({ theme }) => ({
  position: "relative",
  width: "100%",
  bottom: 0,
  mt: "auto",
  padding: theme.spacing(4, 0),
  backgroundColor: theme.palette.gray[10],
}));

const NewsletterInput = styled("input")(({ theme }) => ({
  padding: theme.spacing(1.5),
  border: "1px solid rgba(0, 0, 0, 0.12)",
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(1),
  backgroundColor: theme.palette.white,
  color: theme.palette.gray[90],
  "&:focus": {
    outline: "none",
    borderColor: theme.palette.primary.main,
  },
}));

const SubscribeButton = styled("button")(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  backgroundColor: "#4DB6AC",
  color: theme.palette.common.white,
  border: "none",
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  transition: "background-color 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "#3b9c90",
  },
}));

const socialLinks = [
  { icon: <TwitterIcon />, href: "https://twitter.com/bata" },
  { icon: <LinkedInIcon />, href: "https://linkedin.com/in/bata" },
  { icon: <EmailIcon />, href: "mailto:contact@bata.com" },
  { icon: <FacebookIcon />, href: "mailto:contact@bata.com" },
];

const Footer: React.FC = () => (
    <StyledFooter>
      <Container maxWidth="lg">
        {/* Newsletter Section */}
        <Box
          sx={({ palette }) => ({
            textAlign: "center",
            py: "16px",
            maxWidth: 800,
            mx: "auto",
            mb: 4,
            backgroundColor: palette.white,
          })}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={({ palette }) => ({ color: palette.primary.main })}
          >
            Join the Newsletter
          </Typography>
          <Typography sx={({ palette }) => ({ color: palette.gray[80] })}>
            Subscribe to receive regular updates on new products, articles, and
            courses.
          </Typography>
          <Typography
            sx={({ palette }) => ({ mb: 3, color: palette.gray[80] })}
          >
            Want to receive free Sepolia ETH for this? Visit{" "}
            <Link
              href="/faucet"
              style={{ color: "#4DB6AC", textDecoration: "none" }}
            >
              the faucet
            </Link>{" "}
            after confirming your subscription.
          </Typography>

          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              maxWidth: "600px",
              mx: "auto",
              mb: 2,
            }}
          >
            <NewsletterInput
              type="text"
              placeholder="Name (optional)"
              sx={{ flex: 1 }}
            />
            <NewsletterInput
              type="email"
              placeholder="Email Address"
              sx={{ flex: 1 }}
            />
            <SubscribeButton>Subscribe</SubscribeButton>
          </Box>

          <Typography
            sx={({ palette }) => ({ color: palette.gray[80], mb: 4 })}
          >
            We won&apos;t send you spam. Unsubscribe at any time.
          </Typography>
        </Box>

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
              <SocialLink
                key={index}
                href={link.href}
                icon={link.icon}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </StyledFooter>
  );

export default Footer;
