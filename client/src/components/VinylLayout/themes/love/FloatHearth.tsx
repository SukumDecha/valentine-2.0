import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        { id: Date.now(), left: Math.random() * 100 },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "100vh", opacity: 1 }}
          animate={{ y: "-10vh", opacity: 0 }}
          transition={{ duration: 4, ease: "easeOut" }}
          className="absolute text-pink-500"
          style={{ left: `${heart.left}%` }}
        >
          <Heart size={24} />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
