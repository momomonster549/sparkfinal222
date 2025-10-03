"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import GlowButton from "./GlowButton";

interface CalendarEventProps {
  date: string;
  title: string;
  note: string;
  icon: string;
  index: number;
}

export default function CalendarEvent({ date, title, note, icon, index }: CalendarEventProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  
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
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group perspective-1000"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1,
          z: isHovered ? 30 : 0,
        }}
        className="relative"
      >
        <motion.div
          className="surface rounded-2xl p-6 flex items-center justify-between relative overflow-hidden"
          style={{
            transform: "translateZ(0)",
            boxShadow: isHovered 
              ? "0 15px 30px -5px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255,255,255,0.08), 0 0 16px rgba(241,151,56,0.2)"
              : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255,255,255,0.08)"
          }}
        >
          {/* Background gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-tamarind-orange/5 to-chili-red/5 opacity-0 rounded-2xl"
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Floating background elements */}
          <motion.div
            className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-tamarind-orange/20 to-chili-red/20 rounded-full blur-sm"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              rotate: isHovered ? [0, 90, 180] : 0,
            }}
            transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
          />

          {/* Content */}
          <motion.div
            className="flex items-center gap-4 flex-1"
            style={{
              transform: "translateZ(10px)",
            }}
          >
            {/* Icon with 3D effect */}
            <motion.div
              className="text-2xl"
              animate={{
                rotateY: isHovered ? [0, 180] : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.6 }}
            >
              {icon}
            </motion.div>

            <div className="flex-1">
              <motion.div 
                className="font-label text-xl text-tamarind-orange"
                animate={{
                  color: isHovered ? "#F19738" : "#F19738",
                }}
                transition={{ duration: 0.3 }}
              >
                {date}
              </motion.div>
              
              <motion.div 
                className="font-display2 text-xl mt-1"
                animate={{
                  scale: isHovered ? 1.02 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {title}
              </motion.div>
              
              <motion.div 
                className="prose-muted text-sm mt-1"
                animate={{
                  opacity: isHovered ? 0.9 : 0.75,
                }}
                transition={{ duration: 0.3 }}
              >
                {note}
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            style={{
              transform: "translateZ(15px)",
            }}
            animate={{
              y: isHovered ? -2 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                rotateY: 3,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <GlowButton href="#volunteer">Details</GlowButton>
            </motion.div>
          </motion.div>

          {/* Floating particles on hover */}
          {isHovered && (
            <>
              {[...Array(4)].map((_, j) => (
                <motion.div
                  key={j}
                  className="absolute w-1 h-1 bg-tamarind-orange/60 rounded-full"
                  initial={{
                    x: Math.random() * 200,
                    y: Math.random() * 100,
                    opacity: 0,
                  }}
                  animate={{
                    y: [null, -60],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: j * 0.3,
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
