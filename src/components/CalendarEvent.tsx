"use client";
import { motion } from "framer-motion";
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
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group"
    >
      <motion.div
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

          {/* Content */}
          <div className="flex items-center gap-4 flex-1">
            {/* Icon */}
            <div className="text-2xl">
              {icon}
            </div>

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
              
              <div className="font-display2 text-xl mt-1">
                {title}
              </div>
              
              <div className="prose-muted text-sm mt-1">
                {note}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div>
            <GlowButton href="https://sparkcreativesincorg.base44.app/volunteer">Details</GlowButton>
          </div>

        </motion.div>
      </motion.div>
    </motion.div>
  );
}
