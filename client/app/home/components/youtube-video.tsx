"use client";
import { Video } from "@/app/shared/components";
import { Box } from "@mui/material";

export const YouTubeVideoSection: React.FC<{ videoUrl: string }> = ({ videoUrl }) => (
  <Box sx={{ background: "linear-gradient(135deg, #121619 0%, #1a2833 100%)" }}>
    <Video videoUrl={videoUrl} />
  </Box>
);
