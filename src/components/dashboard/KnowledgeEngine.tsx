'use client';
import { motion } from 'framer-motion';
import DataCharts from './DataCharts';
import AiTools from './AiTools';

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
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="lg:col-span-3" variants={itemVariants}>
        <DataCharts />
      </motion.div>
      <motion.div className="lg:col-span-3" variants={itemVariants}>
        <AiTools />
      </motion.div>
    </motion.div>
  );
}
