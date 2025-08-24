import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type ParallaxSectionType = {
    children: React.ReactNode,
    speed: number,
    className:String,
}


export default function ParallaxSection({ children , speed = 0.5, className = '' }){
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      className={className}
      style={{ transform: `translateY(${offsetY * speed}px)` }}
    >
      {children}
    </motion.div>
  );
}