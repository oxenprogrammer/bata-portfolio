"use client";
import { SocialLink } from "@/app/shared/components";
import HomeContent from "@/app/shared/components/home-content";
import {
  EmailIcon,
  FacebookIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/app/shared/icons";
import { Box, styled, Typography } from "@mui/material";

const contentBlocks = [
  "A Strategic Communications Advisor, lawyer, technologist and recruiter based in Uganda and Kenya.",
  "I advise non profits, people and foundations on using communications for good.",
];

const socialLinks = [
  { icon: <TwitterIcon />, href: "https://twitter.com/bata" },
  { icon: <LinkedInIcon />, href: "https://linkedin.com/in/bata" },
  { icon: <EmailIcon />, href: "mailto:contact@bata.com" },
  { icon: <FacebookIcon />, href: "mailto:contact@bata.com" },
];

const ContentText = styled(Typography)(({ theme }) => ({
  fontSize: "1.6rem",
  lineHeight: 1.5,
  color: theme.palette.gray[70],
  marginBottom: theme.spacing(1),
  maxWidth: "800px",
}));

export const AboutSection = () => {
  return (
    <HomeContent backgroundText="about" title="About Me">
      {contentBlocks.map((content, index) => (
        <ContentText key={index}>{content}</ContentText>
      ))}
      {socialLinks && socialLinks.length > 0 && (
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
      )}
    </HomeContent>
  );
};
