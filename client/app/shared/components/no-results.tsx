import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { SearchOffRounded } from "@mui/icons-material";

export const NoResults = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        px: 4,
        minHeight: "400px",
        width: "100%",
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
      >
        <SearchOffRounded sx={{ fontSize: 64 }} />
      </motion.div>

      <Typography
        variant="h5"
        component={motion.h5}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        sx={{
          mt: 4,
          mb: 2,
          fontWeight: 600,
          color: "text.primary",
        }}
      >
        No Projects Found
      </Typography>

      <Typography
        component={motion.p}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        sx={{
          color: "text.secondary",
          textAlign: "center",
          maxWidth: "400px",
        }}
      >
        Try adjusting your search criteria or filter settings to find what
        you're looking for.
      </Typography>
    </Box>
  );
};
