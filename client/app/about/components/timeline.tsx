import { Box, styled, Typography } from "@mui/material";
import { motion } from "framer-motion";

export const Timeline = styled(Box)(() => ({
  position: 'relative',
}));

export const TimelineItem = styled(motion.div)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(1),
  }
}));

export const TimelineDate = styled(Typography)(({ theme }) => ({
  minWidth: '150px',
  textAlign: 'right',
  color: theme.palette.teal[50],
  fontWeight: 600,
  [theme.breakpoints.down('md')]: {
    textAlign: 'left',
  }
}));
export const TimelineContent = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(3),
  borderRadius: theme.spacing(1),
  boxShadow: theme.boxShadows.sm,
}));
