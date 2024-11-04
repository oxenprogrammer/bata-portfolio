"use client";
import { Box, styled, Container } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const AspectRatioWrapper = styled(Box)({
  position: "relative",
  width: "100%",
  paddingTop: "56.25%", // 56.25% = 9/16 (maintains 16:9 aspect ratio)
});

const StyledCard = styled(Container)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.up("xs")]: {
    maxWidth: theme.breakpoints.values.sm,
  },
  [theme.breakpoints.up("sm")]: {
    maxWidth: theme.breakpoints.values.md,
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: theme.breakpoints.values.lg,
  },
}));

const VideoContainer = styled(Box)(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  "& iframe": {
    width: "100%",
    height: "100%",
    border: "none",
  },
}));

interface YouTubeVideoCardProps {
  videoUrl: string;
  onPipChange?: (isInPip: boolean) => void;
}

export const Video: React.FC<YouTubeVideoCardProps> = ({
  videoUrl,
  onPipChange,
}) => {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPip, setIsPip] = useState(false);

  // Extract video ID from URL
  const getVideoId = (url: string): string => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : "";
  };

  // Handle intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);

          // If video is not in view and not already in PiP, trigger PiP
          if (!entry.isIntersecting && !isPip) {
            handlePictureInPicture();
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isPip]);

  // Handle Picture in Picture
  const handlePictureInPicture = async () => {
    try {
      if (videoRef.current) {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
          setIsPip(false);
        } else {
          const video =
            videoRef.current.contentWindow?.document.querySelector("video");
          if (video) {
            await video.requestPictureInPicture();
            setIsPip(true);
          }
        }
        onPipChange?.(isPip);
      }
    } catch (error) {
      console.error("Picture in Picture failed:", error);
    }
  };
  // Handle PiP change events
  useEffect(() => {
    const handlePipChange = () => {
      setIsPip(document.pictureInPictureElement !== null);
      onPipChange?.(document.pictureInPictureElement !== null);
    };

    document.addEventListener("enterpictureinpicture", handlePipChange);
    document.addEventListener("leavepictureinpicture", handlePipChange);

    return () => {
      document.removeEventListener("enterpictureinpicture", handlePipChange);
      document.removeEventListener("leavepictureinpicture", handlePipChange);
    };
  }, [onPipChange]);

  const videoId = getVideoId(videoUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${
    isInView ? 1 : 0
  }&enablejsapi=1&controls=1`;

  return (
    <StyledCard ref={containerRef}>
      <AspectRatioWrapper>
        <VideoContainer>
          <iframe
            ref={videoRef}
            src={embedUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </VideoContainer>
      </AspectRatioWrapper>
    </StyledCard>
  );
};
