"use client";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface ImpactItem {
  label: string;
  value: string;
}

interface ImpactStripProps {
  items: ImpactItem[];
}

function AnimatedCounter({ value, index }: { value: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);
  
  // Extract number from value (e.g., "84+" -> 84)
  const targetNumber = parseInt(value.replace(/\D/g, '')) || 0;
  
  useEffect(() => {
    if (isInView && targetNumber > 0) {
      const duration = 2000;
      const steps = 60;
      const increment = targetNumber / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
          setCount(targetNumber);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [isInView, targetNumber]);
  
  const displayValue = targetNumber > 0 ? count + (value.includes('+') ? '+' : '') : value;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="relative"
    >
            <motion.div
              className="text-2xl sm:text-3xl md:text-4xl font-label"
              animate={isInView ? {
                textShadow: [
                  "0 0 0px rgba(241,151,56,0)",
                  "0 0 20px rgba(241,151,56,0.5)",
                  "0 0 0px rgba(241,151,56,0)"
                ]
              } : {}}
              transition={{ duration: 2, delay: index * 0.2 + 0.5 }}
            >
              {displayValue}
            </motion.div>
    </motion.div>
  );
}

export default function ImpactStrip({ items }: ImpactStripProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          onHoverStart={() => setHoveredIndex(i)}
          onHoverEnd={() => setHoveredIndex(null)}
          className="group perspective-1000 h-full"
        >
          <motion.div
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              rotateX: 5,
              z: 50,
            }}
            className="surface rounded-2xl p-4 sm:p-6 text-center relative overflow-hidden h-full"
            style={{
              transformStyle: "preserve-3d",
              boxShadow: hoveredIndex === i 
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.08), 0 0 24px rgba(241,151,56,0.25)"
                : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255,255,255,0.08)"
            }}
          >
            {/* Floating background elements */}
            <motion.div
              className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-tamarind-orange/20 to-chili-red/20 rounded-full blur-sm"
              animate={{
                scale: hoveredIndex === i ? [1, 1.3, 1] : 1,
                rotate: hoveredIndex === i ? [0, 180, 360] : 0,
              }}
              transition={{ duration: 2, repeat: hoveredIndex === i ? Infinity : 0 }}
            />
            
            <motion.div
              className="absolute bottom-2 left-2 w-6 h-6 bg-gradient-to-br from-peach-sand/20 to-maize/20 rounded-full blur-sm"
              animate={{
                scale: hoveredIndex === i ? [1, 1.4, 1] : 1,
                rotate: hoveredIndex === i ? [0, -180, -360] : 0,
              }}
              transition={{ duration: 2.5, repeat: hoveredIndex === i ? Infinity : 0 }}
            />

            {/* 3D Counter */}
            <motion.div
              style={{
                transform: "translateZ(20px)",
              }}
              className="relative"
            >
              <AnimatedCounter value={item.value} index={i} />
            </motion.div>
            
            <motion.div
              className="prose-muted text-xs sm:text-sm mt-1 sm:mt-2"
              style={{
                transform: "translateZ(10px)",
              }}
              animate={{
                color: hoveredIndex === i ? "rgba(241,151,56,0.8)" : undefined,
              }}
              transition={{ duration: 0.3 }}
            >
              {item.label}
            </motion.div>

            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-tamarind-orange/5 to-chili-red/5 opacity-0"
              animate={{
                opacity: hoveredIndex === i ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Floating particles on hover */}
            {hoveredIndex === i && (
              <>
                {[...Array(4)].map((_, j) => (
                  <motion.div
                    key={j}
                    className="absolute w-1 h-1 bg-tamarind-orange/60 rounded-full"
                    initial={{
                      x: Math.random() * 200,
                      y: Math.random() * 200,
                      opacity: 0,
                    }}
                    animate={{
                      y: [null, -80],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: j * 0.4,
                    }}
                  />
                ))}
              </>
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
