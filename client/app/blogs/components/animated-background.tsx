"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Box, Theme, useTheme } from "@mui/material";

const getRandomColor = (theme: Theme) => {
  const colors = [
    theme.palette.primary.light,
    theme.palette.secondary.light,
    theme.palette.error.light,
    theme.palette.success.light,
    theme.palette.info.light,
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const AnimatedCircle = ({ size, delay }: { size: string; delay: number }) => {
  const theme = useTheme();
  const color = getRandomColor(theme);

  return (
    <motion.div
      style={{
        position: "absolute",
        borderRadius: "50%",
        width: size,
        height: size,
        backgroundColor: color,
        opacity: 0.4,
        filter: "blur(40px)",
      }}
      initial={{
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }}
      animate={{
        x: [
          Math.random() * window.innerWidth,
          Math.random() * window.innerWidth,
          Math.random() * window.innerWidth,
        ],
        y: [
          Math.random() * window.innerHeight,
          Math.random() * window.innerHeight,
          Math.random() * window.innerHeight,
        ],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
        delay: delay,
        ease: "easeInOut",
      }}
    />
  );
};
export const AnimatedBackground = ({ children }: { children: ReactNode }) => {
  const circleCount = 5;
  const sizes = [200, 250, 300, 350, 400];

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #121619 0%, #1a2833 100%)",
      }}
    >
      {/* Animated Circles */}
      {[...Array(circleCount)].map((_, index) => (
        <AnimatedCircle
          key={index}
          size={`${sizes[index]}px`}
          delay={index * 2}
        />
      ))}

      {/* Main Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 10,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
