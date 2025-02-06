"use client";
import Link from "next/link";
import { Box, Container, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Home, AddAlert } from "@mui/icons-material";

export default function NotFound() {
  return (
    <Container
      component={motion.main}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          maxWidth: "600px",
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <AddAlert sx={{ fontSize: 64, color: "#fc6d46", mb: "1.5rem" }} />
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "4rem", md: "6rem" },
              fontWeight: 700,
              color: "#fc6d46",
              mb: 2,
              lineHeight: 1,
            }}
          >
            404
          </Typography>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 500,
              mb: 3,
              color: "text.primary",
            }}
          >
            Page Not Found
          </Typography>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Typography
            sx={{
              color: "text.secondary",
              mb: 4,
              fontSize: "1.1rem",
            }}
          >
            Oops! The page you&apos;re looking for seems to have vanished into thin
            air. Let&apos;s get you back on track.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            component={Link}
            href="/"
            startIcon={<Home />}
            sx={{
              backgroundColor: "#fc6d46",
              color: "white",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1.1rem",
              "&:hover": {
                backgroundColor: "#e85d35",
              },
            }}
          >
            Back to Home
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 0.6, duration: 1 }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: -1,
            pointerEvents: "none",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "12rem", md: "20rem" },
              fontWeight: 900,
              color: "text.primary",
              opacity: 0.03,
            }}
          >
            404
          </Typography>
        </motion.div>
      </Box>
    </Container>
  );
}
