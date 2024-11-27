"use client";
import {
  Box,
  Typography,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { motion } from "framer-motion";
import Image from "next/image";

export const Mentorship = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <Container>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          padding: theme.spacing(4),
        }}
      >
        <motion.div variants={contentVariants} style={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom>
            Mentorship Series
          </Typography>
          <Typography gutterBottom>
            In a world full of uncertainty, navigating career paths and your
            future can be daunting. That's why we've curated a series of free
            mentorship sessions designed to provide guidance, support, and
            invaluable insights to help you chart a successful and fulfilling
            career path.
          </Typography>
          <Typography gutterBottom>
            Subscribe to our mailing list, and get notified when we have the
            get-togethers with mentors from around the world.
          </Typography>
          <Box component="form" noValidate autoComplete="off" mt={4}>
            <TextField
              id="email"
              label="Email Address"
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: <Button endIcon={<SendIcon />}>Sign Up</Button>,
              }}
            />
          </Box>
        </motion.div>
        <motion.div
          variants={imageVariants}
          style={{ flex: 1, marginLeft: isMobile ? 0 : theme.spacing(4) }}
        >
          <Image
            src="/images/mentorship.png"
            alt="Mentorship Series"
            layout="responsive"
            width={800}
            height={600}
          />
        </motion.div>
      </motion.div>
    </Container>
  );
};
