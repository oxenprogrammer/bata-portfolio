import { useState } from "react";
import { Box, Typography, Card, Grid, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    quote:
      "This mentorship program completely transformed my career trajectory. The insights I gained were invaluable.",
    image: "https://picsum.photos/200",
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    quote:
      "The mentors provided me with strategic guidance that helped me navigate complex career challenges.",
    image: "https://picsum.photos/200",
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    quote:
      "I learned more in these sessions than in years of professional development workshops.",
    image: "https://picsum.photos/200",
  },
  {
    name: "David Kim",
    role: "Data Scientist",
    quote:
      "The personalized advice and network connections were game-changers for my professional growth.",
    image: "https://picsum.photos/200",
  },
];

export const TestimonialCards = () => {
  const theme = useTheme();
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const cardVariants = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" align="center" gutterBottom sx={{ mb: 4 }}>
        What Our Participants Say
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={3} key={testimonial.name}>
            <motion.div
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.05 }}
            >
              <Card
                sx={{
                  aspectRatio: "1/1", // Make the card square
                  position: "relative",
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                  cursor: "pointer",
                  backgroundColor: theme.palette.background.paper,
                  overflow: "hidden",
                }}
                onClick={() =>
                  setFlippedCard((prevFlipped) =>
                    prevFlipped === index ? null : index
                  )
                }
              >
                <AnimatePresence mode="wait">
                  {flippedCard !== index ? (
                    <motion.div
                      key="front"
                      initial={{ rotateY: 0 }}
                      animate={{ rotateY: 0 }}
                      exit={{ rotateY: 180 }}
                      transition={{ duration: 0.6 }}
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            height: "75%",
                            position: "relative",
                            "& img": {
                              transition: "filter 0.3s ease",
                              filter: "grayscale(0%)",
                            },
                            "&:hover img": {
                              filter: "grayscale(100%)",
                            },
                          }}
                        >
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            height: "25%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            p: 1,
                            backgroundColor: theme.palette.orange[60],
                          }}
                        >
                          <Typography
                            variant="h6"
                            align="center"
                            sx={{ fontSize: "0.9rem" }}
                          >
                            {testimonial.name}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            align="center"
                            sx={{ fontSize: "0.7rem" }}
                          >
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="back"
                      initial={{ rotateY: -180 }}
                      animate={{ rotateY: 0 }}
                      exit={{ rotateY: 180 }}
                      transition={{ duration: 0.6 }}
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          p: 2,
                          backgroundColor: theme.palette.teal[80],
                        }}
                      >
                        <Typography align="center" sx={{ fontStyle: "italic" }}>
                          "{testimonial.quote}"
                        </Typography>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
