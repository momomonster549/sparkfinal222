"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import GlowButton from "./GlowButton";

interface DonationCardProps {
  tier: string;
  price: string;
  bullets: string[];
  cta: string;
  icon: string;
  color: string;
  index: number;
}

export default function DonationCard({ 
  tier, 
  price, 
  bullets, 
  cta, 
  icon, 
  color, 
  index 
}: DonationCardProps) {
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
        <motion.div
          className="surface rounded-2xl p-4 sm:p-6 flex flex-col h-full relative overflow-hidden"
          style={{
            transform: "translateZ(0)",
            boxShadow: isHovered 
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.08), 0 0 24px rgba(241,151,56,0.25)"
              : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255,255,255,0.08)"
          }}
        >
          {/* Gradient background overlay */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 rounded-2xl`}
            animate={{
              opacity: isHovered ? 0.1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Floating background elements */}
          <motion.div
            className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${color} opacity-20 rounded-full blur-sm`}
            animate={{
              scale: isHovered ? [1, 1.3, 1] : 1,
              rotate: isHovered ? [0, 180, 360] : 0,
            }}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
          />
          
          <motion.div
            className={`absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br ${color} opacity-15 rounded-full blur-sm`}
            animate={{
              scale: isHovered ? [1, 1.4, 1] : 1,
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
              scale: isHovered ? 1.2 : 1,
            }}
            transition={{ duration: 0.6 }}
          >
            {icon}
          </motion.div>

          {/* Content */}
          <motion.div
            className="flex-1"
            style={{
              transform: "translateZ(10px)",
            }}
          >
            <motion.p 
              className="font-label tracking-wider text-tamarind-orange text-sm sm:text-base"
              animate={{
                color: isHovered ? "#F19738" : undefined,
              }}
              transition={{ duration: 0.3 }}
            >
              {tier}
            </motion.p>
            
            <motion.h3 
              className="font-display2 text-2xl sm:text-3xl mt-1 sm:mt-2"
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {price}
            </motion.h3>
            
            <motion.ul 
              className="prose-muted mt-3 sm:mt-4 space-y-1 sm:space-y-2 list-disc list-inside text-sm sm:text-base"
              animate={{
                opacity: isHovered ? 0.9 : 0.75,
              }}
              transition={{ duration: 0.3 }}
            >
              {bullets.map((bullet, j) => (
                <motion.li 
                  key={j}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: j * 0.1 }}
                >
                  {bullet}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="mt-4 sm:mt-6"
            style={{
              transform: "translateZ(15px)",
            }}
            animate={{
              y: isHovered ? -5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <GlowButton href="#donate">{cta}</GlowButton>
            </motion.div>
          </motion.div>

          {/* Floating particles on hover */}
          {isHovered && (
            <>
              {[...Array(8)].map((_, j) => (
                <motion.div
                  key={j}
                  className="absolute w-1 h-1 bg-tamarind-orange/60 rounded-full"
                  initial={{
                    x: Math.random() * 300,
                    y: Math.random() * 300,
                    opacity: 0,
                  }}
                  animate={{
                    y: [null, -120],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: j * 0.3,
                  }}
                />
              ))}
            </>
          )}

          {/* Glow effect on hover */}
          <motion.div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} opacity-0`}
            animate={{
              opacity: isHovered ? 0.05 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
