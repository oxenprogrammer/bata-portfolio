import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ProjectCard } from './project-card';

interface AnimatedProjectCardProps {
  project: Project;
  index: number;
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
      delay: index * 0.2, // Stagger effect based on card index
      ease: "easeOut"
    }
  })
};

export const AnimateProjectCard: React.FC<AnimatedProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
    >
      <ProjectCard project={project} />
    </motion.div>
  );
};