import React from 'react';
import { motion } from 'framer-motion';


interface AnimateCardProps {
  index: number;
  children?: React.ReactNode;
}

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.2,
      ease: "easeOut"
    }
  })
};

export const AnimateCard: React.FC<AnimateCardProps> = ({ index, children }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
    >
      {
        children
      }
    </motion.div>
  );
};