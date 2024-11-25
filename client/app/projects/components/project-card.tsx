import { Project } from "@/app/shared/types";
import { Box, styled, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HTMLMotionProps } from "framer-motion";

// Extend the ProjectCardProps to include motion props
interface ProjectCardProps
  extends Project,
    Omit<HTMLMotionProps<"div">, keyof Project> {
  onClick?: () => void;
}

// Convert styled components to use motion components
const CardContainer = styled(motion.div)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
}));

const ImageContainer = styled(motion.div)(() => ({
  position: "relative",
  width: "100%",
  paddingTop: "60%",
  overflow: "hidden",
  cursor: "pointer",
  "& img": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const ContentContainer = styled(motion.div)(({ theme }) => ({
  flex: "1 1 auto",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

// Keep other styled components the same
const DateText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
}));

const TitleText = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.125rem",
  marginBottom: theme.spacing(1),
  textAlign: "left",
}));

const DescriptionText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const CategoryList = styled(motion.div)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  flexWrap: "wrap",
  marginTop: theme.spacing(1),
}));

const CategoryChip = styled(motion.div)(({ theme }) => ({
  fontSize: "0.75rem",
  padding: theme.spacing(0.5, 1),
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.secondary,
}));

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
    },
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.2,
    },
  },
};

const imageVariants = {
  hover: {
    scale: 1.05,
    filter: "grayscale(100%)",
    transition: {
      duration: 0.3,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  images,
  title,
  description,
  summary,
  date,
  organization,
  categories,
  ...motionProps
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date
      .toLocaleDateString("en-US", { month: "short" })
      .toUpperCase();
    const year = date.toLocaleDateString("en-US", { year: "numeric" });
    return { month, year };
  };
  const { month, year } = formatDate(date);

  return (
    <CardContainer variants={cardVariants} whileHover="hover" {...motionProps}>
      <Link href={`/projects/${id}`} style={{ textDecoration: "none" }}>
        <ImageContainer variants={imageVariants}>
          <Image fill priority src={images[0]} alt={title} />
        </ImageContainer>
      </Link>
      <ContentContainer>
        <Box>
          <Box
            component={motion.div}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "68px",
              gap: "32px",
            }}
          >
            <Box
              component={motion.div}
              sx={{ display: "flex", alignItems: "center", gap: "4px" }}
            >
              <DateText>{month}</DateText>
              <DateText>{year}</DateText>
            </Box>
            <TitleText>{title}</TitleText>
          </Box>
          <Typography
            component={motion.p}
            color="text.secondary"
            sx={{ fontWeight: "bold", fontSize: "16px" }}
          >
            {organization}
          </Typography>
          <DescriptionText>{description || summary}</DescriptionText>
          <CategoryList>
            {categories.map((category, index) => (
              <CategoryChip
                key={index}
                custom={index}
                variants={categoryVariants}
                whileHover="hover"
              >
                {category}
              </CategoryChip>
            ))}
          </CategoryList>
        </Box>
      </ContentContainer>
    </CardContainer>
  );
};

export default ProjectCard;
