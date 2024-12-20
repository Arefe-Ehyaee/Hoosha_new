import React, { ReactNode, useContext } from "react";
import { motion } from "framer-motion";
import { IntersectionContext } from "./IntersectionObserverWrapper";

interface ScaleBoxProps {
  children: ReactNode; // Explicitly define the `children` prop
}

const ScaleBox = ({ children }: ScaleBoxProps) => {
  const { inView } = useContext(IntersectionContext); // Get inView from context

  const variants = {
    hidden: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.4, delay: 0.2, ease: "easeInOut" },
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, delay: 0.2, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      exit="hidden"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default ScaleBox;
