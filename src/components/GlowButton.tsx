"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { PropsWithChildren, useRef, useState } from "react";

type Props = PropsWithChildren<{ href?: string; onClick?: () => void; className?: string; }>;

export default function GlowButton({ href = "#", onClick, className = "", children }: Props) {
  const buttonRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      mouseX.set(distanceX / (rect.width / 2));
      mouseY.set(distanceY / (rect.height / 2));
    }
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const Btn = (
    <motion.span
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ 
        y: -2,
        scale: 1.05,
      }}
      whileTap={{ scale: 0.95 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`inline-flex items-center justify-center rounded-full px-4 sm:px-5 py-3 text-sm font-label tracking-wider uppercase ring-glow bg-white/5 border border-white/10 hover:bg-white/10 bg-tamarind-orange/10 border-tamarind-orange/20 hover:bg-tamarind-orange/20 text-[#E7E9EE] transition relative overflow-hidden touch-target min-h-[44px] ${className}`}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-tamarind-orange/20 to-chili-red/20 opacity-0"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Floating particles on hover */}
      {isHovered && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-tamarind-orange/80 rounded-full"
              initial={{
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                opacity: 0,
              }}
              animate={{
                y: [null, -60],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </>
      )}
      
      {/* Text with 3D effect */}
      <motion.span
        style={{
          transform: "translateZ(10px)",
        }}
        className="relative z-10"
      >
        {children}
      </motion.span>
    </motion.span>
  );

  if (href && href !== "#") {
    return <Link href={href as any} onClick={onClick}>{Btn}</Link>;
  }

  return (
    <button onClick={onClick} className="inline-block">
      {Btn}
    </button>
  );
}
