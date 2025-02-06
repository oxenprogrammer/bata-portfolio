"use client";
import { Box } from "@mui/material";
import {
  AboutSection,
  BlogsSection,
  FormerWorkSection,
  HeroSection,
  ProjectsSection,
  YouTubeVideoSection,
} from ".";

export const Home = () => {
  return (
    <Box>
      <HeroSection />
      <AboutSection />
      <FormerWorkSection />
      <ProjectsSection />
      <BlogsSection />
      <YouTubeVideoSection videoUrl="https://www.youtube.com/watch?v=TEFJSi8_Dbg" />
    </Box>
  );
};
