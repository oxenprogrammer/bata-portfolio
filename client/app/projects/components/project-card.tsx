import { Project } from "@/app/shared/types";
import { Box, styled, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps extends Project {
    onClick?: () => void;
  }
  
  const CardContainer = styled(Box)(({ theme }) => ({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
    transition: "all 0.3s ease",
    "&:hover $imageContainer": {
      filter: "grayscale(100%)",
    },
  }));
  
  const ImageContainer = styled(Box)(() => ({
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
      transition: "filter 0.3s ease",
      filter: "grayscale(0%)",
    },
    "&:hover img": {
      filter: "grayscale(100%)",
    },
  }));
  
  const ContentContainer = styled(Box)(({ theme }) => ({
    flex: "1 1 auto",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.divider}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }));
  
  const DateText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: "0.875rem",
    marginBottom: theme.spacing(1),
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
  
  const CategoryList = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(1),
    flexWrap: "wrap",
    marginTop: theme.spacing(1),
  }));
  
  const CategoryChip = styled(Typography)(({ theme }) => ({
    fontSize: "0.75rem",
    padding: theme.spacing(0.5, 1),
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.secondary,
  }));

const ProjectCard: React.FC<ProjectCardProps> = ({
    id,
    images,
    title,
    description,
    summary,
    date,
    organization,
    categories,
  }) => {
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      }).toUpperCase();
    };
  
    return (
      <CardContainer>
        <Link href={`/projects/${id}`} style={{ textDecoration: "none" }}>
          <ImageContainer>
            <Image fill priority src={images[0]} alt={title} />
          </ImageContainer>
        </Link>
        <ContentContainer>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "68px",
              }}
            >
              <DateText>{formatDate(date)}</DateText>
              <TitleText>{title}</TitleText>
            </Box>
            <Typography color="text.secondary" sx={{  fontWeight: "bold", fontSize: "16px"}}>{organization}</Typography>
            <DescriptionText>{description || summary}</DescriptionText>
            <CategoryList>
              {categories.map((category, index) => (
                <CategoryChip key={index}>{category}</CategoryChip>
              ))}
            </CategoryList>
          </Box>
        </ContentContainer>
      </CardContainer>
    );
  };
  
  export default ProjectCard;