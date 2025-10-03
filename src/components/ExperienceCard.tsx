"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

interface ExperienceCardProps {
  title: string;
  body: string;
  icon: string;
  index: number;
}

export default function ExperienceCard({ title, body, icon, index }: ExperienceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
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

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group perspective-1000 h-full"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.05 : 1,
          z: isHovered ? 50 : 0,
        }}
        className="relative h-full"
      >
        {/* Card background with depth */}
        <motion.div
          className="surface rounded-2xl p-4 sm:p-6 h-full relative overflow-hidden"
          style={{
            transform: "translateZ(0)",
            boxShadow: isHovered 
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.08), 0 0 24px rgba(241,151,56,0.25)"
              : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255,255,255,0.08)"
          }}
        >
          {/* Floating background elements */}
          <motion.div
            className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-tamarind-orange/10 to-chili-red/10 rounded-full blur-sm"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              rotate: isHovered ? [0, 180, 360] : 0,
            }}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
          />
          
          <motion.div
            className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-peach-sand/10 to-maize/10 rounded-full blur-sm"
            animate={{
              scale: isHovered ? [1, 1.3, 1] : 1,
              rotate: isHovered ? [0, -180, -360] : 0,
            }}
            transition={{ duration: 2.5, repeat: isHovered ? Infinity : 0 }}
          />

          {/* Icon with 3D effect */}
          <motion.div
            className="text-3xl sm:text-4xl mb-3 sm:mb-4"
            style={{
              transform: "translateZ(20px)",
            }}
            animate={{
              rotateY: isHovered ? [0, 360] : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6 }}
          >
            {icon}
          </motion.div>

          {/* Content */}
          <motion.div
            style={{
              transform: "translateZ(10px)",
            }}
          >
            <motion.h3 
              className="font-display2 text-xl sm:text-2xl mb-2 sm:mb-3"
              animate={{
                color: isHovered ? "#F19738" : undefined,
              }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>
            
            <motion.p 
              className="prose-muted text-sm sm:text-base leading-relaxed"
              animate={{
                opacity: isHovered ? 0.9 : 0.75,
              }}
              transition={{ duration: 0.3 }}
            >
              {body}
            </motion.p>
          </motion.div>

          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-tamarind-orange/5 to-chili-red/5 opacity-0"
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
                  className="absolute w-1 h-1 bg-tamarind-orange/60 rounded-full"
                  initial={{
                    x: Math.random() * 200,
                    y: Math.random() * 200,
                    opacity: 0,
                  }}
                  animate={{
                    y: [null, -100],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
