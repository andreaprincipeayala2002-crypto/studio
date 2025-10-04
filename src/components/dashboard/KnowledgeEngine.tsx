'use client';
import { motion } from 'framer-motion';
import AiTools from './AiTools';
import UserPerformanceCharts from './UserPerformanceCharts';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
    },
  },
};

export default function KnowledgeEngine() {
  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <UserPerformanceCharts />
      </motion.div>
      <motion.div variants={itemVariants}>
        <AiTools />
      </motion.div>
    </motion.div>
  );
}
