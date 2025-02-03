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
import WorkIcon from "@mui/icons-material/Work";
import {
  EmailIcon,
  FacebookIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/app/shared/icons";
import { SocialLink } from "@/app/shared/components";
import { Timeline, TimelineContent, TimelineDate, TimelineItem } from "./timeline";

export const careerData = [
  {
    period: "Feb 2024 — Present",
    role: "Senior Communications Advisor",
    company: "United Nations Foundation, Washington",
  },
  {
    period: "Jan 2022 — Jan 2024",
    role: "Director of Communications",
    company: "Pollicy, Hybrid",
  },
  {
    period: "Jan 2021 — Dec 2021",
    role: "Independent Communications Consultant",
    company: "Eastern and Southern Africa",
  },
  {
    period: "Jan 2019 — Dec 2019",
    role: "Communications Coordinator",
    company: "Uganda Key Populations Consortium",
  },
  {
    period: "Dec 2015 — Dec 2020",
    role: "Head of Communications",
    company: "Reach A Hand Uganda, Kampala",
  }
];

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  padding: theme.spacing(2),
  gap: theme.spacing(4),
  position: "relative",
  overflow: "visible",
  zIndex: 1,
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  }
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
  "& img": {
    transition: "filter 0.3s ease",
    filter: "grayscale(0%)",
  },
  "&:hover img": {
    filter: "grayscale(50%)",
  },
}));

const ContentSection = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  zIndex: 2,
  gap: theme.spacing(8),
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

const Skills = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const Skill = styled(motion.div)(({ theme }) => ({
  backgroundColor: theme.palette.gray[90],
  color: theme.palette.common.white,
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(4),
  fontSize: "0.9rem",
  "&:hover": {
    backgroundColor: theme.palette.gray[80],
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  width: "100%",
  position: "relative",
  zIndex: 2,
}));

const socialLinks = [
  {
    icon: (
      <TwitterIcon
        sx={({ palette }) => ({
          color: palette.gray[70],
          "&:hover": { color: palette.gray[30] },
        })}
      />
    ),
    href: "https://x.com/ibatambuze",
  },
  {
    icon: (
      <LinkedInIcon
        sx={({ palette }) => ({
          color: palette.gray[70],
          "&:hover": { color: palette.gray[30] },
        })}
      />
    ),
    href: "https://www.linkedin.com/in/ibatambuze/",
  },
  {
    icon: (
      <EmailIcon
        sx={({ palette }) => ({
          color: palette.gray[70],
          "&:hover": { color: palette.gray[30] },
        })}
      />
    ),
    href: "mailto:ibrahimbatambuze@gmail.com",
  },
  {
    icon: (
      <FacebookIcon
        sx={({ palette }) => ({
          color: palette.gray[70],
          "&:hover": { color: palette.gray[30] },
        })}
      />
    ),
    href: "https://www.youtube.com/@IbrahimBatambuze",
  },
];

export const About: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const skills = [
    "Mentorship",
    "Project Management",
    "Consultancy",
    "Public Speaking",
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
                  A Strategic Communications Advisor
                </Typography>
                <Typography>
                  I am Ibrahim Waiswa Batambuze, and I am deeply involved in
                  communications and impact-driven initiatives. As the Founder
                  and Group CEO of Marimba Communications Group, I focus on
                  African storytelling, development communications, and digital
                  impact. In my role as a Senior Communications Associate with
                  the Digital Impact Alliance (DIAL), I work to create awareness
                  about DIAL's initiatives across Africa, often through writing
                  impact stories, strategizing on digital inclusion, and
                  supporting discussions around digital public infrastructure
                  (DPI).
                </Typography>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, my: 2 }}
                >
                  <WorkIcon
                    sx={({ palette }) => ({ color: palette.gray[70] })}
                  />
                  <Typography variant="h6">Some of my top skills</Typography>
                </Box>

                <Skills>
                  {skills.map((skill) => (
                    <Skill key={skill} variants={itemAnimation}>
                      {skill}
                    </Skill>
                  ))}
                </Skills>
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  {socialLinks.map((link, index) => (
                    <SocialLink key={index} href={link.href} icon={link.icon} />
                  ))}
                </Box>
              </motion.div>
            </Box>
          </ContentSection>

          <ContentSection
            sx={{
              flexDirection: isMobile ? "column-reverse" : "row",
              mt: 8,
              width: "100%",
            }}
          >
            <Box sx={{ maxWidth: 600 }}>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                  Career Timeline
                </Typography>
                <Timeline>
                  {careerData.map((item, index) => (
                    <>
                    <TimelineItem
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.2,
                        ease: "easeOut"
                      }}
                    >
                      <TimelineDate variant="h6">
                        {item.period}
                      </TimelineDate>
                      <TimelineContent>
                        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                          {item.role}
                        </Typography>
                        <Typography sx={{ color: 'gray.50', mb: 1 }}>
                          {item.company}
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                    <hr style={{ borderColor: 'gray', opacity: 0.2, marginBottom: "16px" }} />
                    </>
                  ))}
                </Timeline>
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