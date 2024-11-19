"use client";
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  styled,
} from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  padding: theme.spacing(2),
  gap: theme.spacing(4),
  position: "relative",
  overflow: "visible",
  zIndex: 1,
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  width: "100%",
  maxWidth: "400px",
  height: "500px",
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("md")]: {
    height: "400px",
  },
}));

const ContentSection = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  zIndex: 2,
  gap: theme.spacing(8),
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: theme.spacing(4),
  },
}));

const SocialLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
}));

const IconButton = styled(motion.a)(({ theme }) => ({
  color: theme.palette.primary.main,
  cursor: "pointer",
  padding: theme.spacing(1),
  borderRadius: "50%",
  border: `2px solid ${theme.palette.primary.main}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const Skills = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const Skill = styled(motion.div)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(4),
  fontSize: "0.9rem",
}));

const MainContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  width: "100%",
  position: "relative",
  zIndex: 2,
}));

export const About: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const skills = [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "AWS",
    "Docker",
  ];

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <StyledContainer maxWidth="lg">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerAnimation}
      >
        <MainContent>
          <ContentSection>
            <motion.div
              style={{ width: "100%", maxWidth: "400px" }}
              variants={itemAnimation}
            >
              <ImageContainer>
                <Image
                  src="/images/profile_picture_1.jpg"
                  alt="Professional headshot"
                  priority
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </ImageContainer>
            </motion.div>

            <Box sx={{ maxWidth: 600 }}>
              <motion.div variants={itemAnimation}>
                <Typography
                  variant="h3"
                  component="h1"
                  gutterBottom
                  fontWeight="bold"
                  sx={{ color: "white" }}
                >
                  About Me
                </Typography>
                <Typography
                  variant="h5"
                  color="primary"
                  gutterBottom
                  sx={{ color: "white" }}
                >
                  Full Stack Developer & Tech Enthusiast
                </Typography>
                <Typography>
                  I&apos;m passionate about creating elegant solutions to
                  complex problems. With expertise in modern web technologies
                  and a keen eye for design, I build scalable and user-friendly
                  applications that make a difference.
                </Typography>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, my: 2 }}
                >
                  <WorkIcon color="primary" />
                  <Typography variant="h6">
                    Senior Software Engineer at TechCorp
                  </Typography>
                </Box>

                <Skills>
                  {skills.map((skill) => (
                    <Skill key={skill} variants={itemAnimation}>
                      {skill}
                    </Skill>
                  ))}
                </Skills>

                <SocialLinks>
                  <IconButton
                    href="https://linkedin.com"
                    target="_blank"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton
                    href="https://github.com"
                    target="_blank"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <GitHubIcon />
                  </IconButton>
                  <IconButton
                    href="mailto:email@example.com"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <EmailIcon />
                  </IconButton>
                </SocialLinks>
              </motion.div>
            </Box>
          </ContentSection>

          <ContentSection
            sx={{
              flexDirection: isMobile ? "column-reverse" : "row",
              mt: 8,
            }}
          >
            <Box sx={{ maxWidth: 600 }}>
              <motion.div variants={itemAnimation}>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                  My Approach
                </Typography>
                <Typography>
                  I believe in writing clean, maintainable code and creating
                  intuitive user experiences. My background in both front-end
                  and back-end development allows me to approach projects
                  holistically, ensuring seamless integration across the entire
                  stack.
                </Typography>
                <Typography>
                  When I&apos;m not coding, you&apos;ll find me exploring new
                  technologies, contributing to open-source projects, or sharing
                  my knowledge through technical writing and mentorship.
                </Typography>
              </motion.div>
            </Box>

            <motion.div
              style={{ width: "100%", maxWidth: "400px" }}
              variants={itemAnimation}
            >
              <ImageContainer>
                <Image
                  src="/images/profile_picture_2.jpg"
                  alt="Professional headshot"
                  priority
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </ImageContainer>
            </motion.div>
          </ContentSection>
        </MainContent>
      </motion.div>
    </StyledContainer>
  );
};
