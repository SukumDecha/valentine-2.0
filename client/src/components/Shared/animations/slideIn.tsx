"use client";

import { motion } from "framer-motion";
import { ReactNode, RefObject } from "react";
import { useInView } from "react-intersection-observer";

type SlideInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  scrollContainer?: RefObject<HTMLElement>; // เพิ่ม prop สำหรับกำหนด viewport
};

const SlideIn = ({ children, delay = 0, className = "", scrollContainer }: SlideInProps) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // เล่นแค่ครั้งเดียว
    threshold: 0.4, // เมื่อ 20% ของคอมโพเนนต์อยู่ใน viewport
    root: scrollContainer?.current || null, // กำหนด viewport ที่ต้องการ
  });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn;
