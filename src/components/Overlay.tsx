import React from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

const Overlay = ({ children }: Props) => {
  return (
    <motion.div
      className="bg-black bg-opacity-50 fixed z-[99999] inset-0 h-screen w-[100vw] flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Overlay;
