"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { PropsWithChildren, useRef } from "react";

export default function Section({ id, title, kicker, children }: PropsWithChildren<{ id?: string; title?: string; kicker?: string;}>) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms for different elements
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);

  return (
    <motion.section 
      ref={sectionRef}
      id={id} 
      className="py-16 sm:py-24 md:py-32 relative overflow-hidden"
      style={{ opacity }}
    >
      {/* Background parallax layers */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-tamarind-orange/5 to-transparent"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent via-chili-red/3 to-transparent"
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
        {(kicker || title) && (
          <motion.header 
            className="mb-6 sm:mb-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {kicker && (
              <motion.p 
                className="text-tamarind-orange font-label tracking-widest text-sm sm:text-base"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {kicker}
              </motion.p>
            )}
            {title && (
              <motion.h2 
                className="mt-1 sm:mt-2 font-display2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                style={{
                  transform: "translateZ(20px)",
                }}
              >
                {title}
              </motion.h2>
            )}
          </motion.header>
        )}
        
        <motion.div
          style={{
            transform: "translateZ(10px)",
          }}
        >
          {children}
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-tamarind-orange/10 to-chili-red/10 rounded-full blur-2xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-peach-sand/10 to-maize/10 rounded-full blur-xl"
      />
    </motion.section>
  );
}
