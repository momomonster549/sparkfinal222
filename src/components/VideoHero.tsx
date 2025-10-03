"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import GlowButton from "./GlowButton";

interface VideoHeroProps {
  videoUrl?: string;
  showVideo?: boolean;
}

export default function VideoHero({ videoUrl = "https://cqxporsfudzigeimzawn.supabase.co/storage/v1/object/sign/website-assets-video/Igniting%20Creative%20Change!.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmNkMDYzYy1mYzcwLTQ5ZmMtOTEzMS0zMDUyOTU1MzRiZGMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy12aWRlby9JZ25pdGluZyBDcmVhdGl2ZSBDaGFuZ2UhLm1wNCIsImlhdCI6MTc1OTUzMDcwMywiZXhwIjoxNzkxMDY2NzAzfQ.zfZzbpeaRDMLc0--WZz3CLDIfezj1dpSAbA1TWrTpC4", showVideo = true }: VideoHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [videoError, setVideoError] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  // Particle and shape transforms
  const particleX = useTransform(springX, [-50, 50], [-30, 30]);
  const particleScrollY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Shape transforms for geometric elements
  const shapeX1 = useTransform(springX, [-50, 50], [-20, 20]);
  const shapeY1 = useTransform(springY, [-50, 50], [-20, 20]);
  const shapeX2 = useTransform(springX, [-50, 50], [20, -20]);
  const shapeY2 = useTransform(springY, [-50, 50], [20, -20]);
  const shapeX3 = useTransform(springX, [-50, 50], [-30, 30]);
  const shapeY3 = useTransform(springY, [-50, 50], [30, -30]);

  // Content transforms
  const contentX = useTransform(springX, [-50, 50], [-10, 10]);
  const contentY = useTransform(springY, [-50, 50], [-5, 5]);

  useEffect(() => {
    setMounted(true);
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({ smoothWheel: true });
      const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      return () => { /* @ts-ignore */ lenis?.destroy?.(); };
    });
  }, []);

  // Force video to play
  useEffect(() => {
    if (videoRef.current && showVideo) {
      const video = videoRef.current;

      // Set video attributes
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');

      // Force load the video
      video.load();

      const playVideo = async () => {
        try {
          console.log('Attempting to play video...');
          await video.play();
          console.log('Video play successful!');
          setVideoStarted(true);
        } catch (error) {
          console.error('Video play failed:', error);
          setVideoError(true);
        }
      };

      // Try to play when metadata loads
      video.addEventListener('loadedmetadata', () => {
        console.log('Video metadata loaded');
        playVideo();
      });

      // Try to play when data loads
      video.addEventListener('loadeddata', () => {
        console.log('Video data loaded');
        playVideo();
      });

      // Try to play when can play
      video.addEventListener('canplay', () => {
        console.log('Video can play');
        playVideo();
      });

      return () => {
        video.removeEventListener('loadedmetadata', playVideo);
        video.removeEventListener('loadeddata', playVideo);
        video.removeEventListener('canplay', playVideo);
      };
    }
  }, [showVideo]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
        // Reduce mouse sensitivity on mobile
        const isMobile = window.innerWidth < 768;
        mouseX.set(x * (isMobile ? 25 : 50));
        mouseY.set(y * (isMobile ? 25 : 50));
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const handleVideoClick = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setVideoStarted(true);
      }).catch(console.error);
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative overflow-hidden min-h-screen flex items-center cursor-pointer"
      onClick={handleVideoClick}
    >
      {/* Fallback background in case video doesn't load */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-cream via-peach-sand to-maize dark:from-[#0A0B10] dark:via-[#1A1B20] dark:to-[#2A1B30]" />

      {/* Video Background */}
      {mounted && showVideo && !videoError && (
        <div className="absolute inset-0 z-10">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={(e) => {
              const target = e.target as HTMLVideoElement;
              console.error('Video error details:', {
                error: target.error,
                networkState: target.networkState,
                readyState: target.readyState,
                src: target.currentSrc || target.src
              });
              setVideoError(true);
            }}
            onLoadStart={() => {
              console.log('Video load started');
              setVideoStarted(true);
            }}
            onPlay={() => {
              console.log('VIDEO IS PLAYING!');
            }}
            onPause={() => {
              console.log('Video paused');
            }}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Video Overlay */}
      <div className="absolute inset-0 z-20 bg-black/40 dark:bg-black/60 pointer-events-none" />

      {/* 3D Background Layers */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {/* Deep background */}
        <motion.div
          style={{ y: y3, scale }}
          className="absolute inset-0 bg-gradient-to-br from-cream/80 via-peach-sand/60 to-maize/80 dark:from-[#0A0B10]/80 dark:via-[#1A1B20]/60 dark:to-[#2A1B30]/80"
        />
        
        {/* Floating geometric shapes - responsive sizes */}
        <motion.div
          style={{
            x: shapeX1,
            y: y2
          }}
          className="absolute top-10 sm:top-20 left-4 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-gradient-to-br from-chili-red/30 to-tamarind-orange/30 dark:from-tamarind-orange/20 dark:to-chili-red/20 rounded-full blur-lg sm:blur-xl"
        />
        <motion.div
          style={{
            x: shapeX2,
            y: y1
          }}
          className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-24 h-24 sm:w-48 sm:h-48 bg-gradient-to-br from-tamarind-orange/25 to-chili-red/25 dark:from-chili-red/15 dark:to-tamarind-orange/15 rounded-full blur-xl sm:blur-2xl"
        />
        <motion.div
          style={{
            x: shapeX3,
            y: y2
          }}
          className="absolute top-1/2 left-1/6 sm:left-1/4 w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-br from-maize/35 to-peach-sand/35 dark:from-peach-sand/20 dark:to-maize/20 rounded-full blur-md sm:blur-lg"
        />
      </div>

      {/* Main content with 3D transforms */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-28 md:py-40 relative z-40">
        <motion.div
          style={{
            x: contentX,
            y: y1,
            opacity
          }}
          className="space-y-4 sm:space-y-6"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-label tracking-widest text-chili-red dark:text-tamarind-orange text-sm sm:text-base"
          >
            SparkCreatives Inc
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-display1 text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-[#2A1810] dark:text-[#E7E9EE]"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`
            }}
          >
            Igniting change.{" "}
            <motion.span
              className="text-chili-red dark:text-tamarind-orange inline-block"
              whileHover={{
                scale: 1.05,
                rotateX: 5,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
            >
              Turning excess
            </motion.span>{" "}
            to empowerment.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-3 sm:mt-5 max-w-2xl prose-muted text-[#2A1810]/80 dark:text-[#E7E9EE]/75 text-sm sm:text-base leading-relaxed"
          >
            Sponsor a box or become a monthly donor. Your support fuels starter-kit deliveries and no-cost micro-business coaching.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <GlowButton href="#get-involved" className="w-full sm:w-auto text-center">Sponsor a Box</GlowButton>
            </motion.div>
            <motion.div
              whileHover={{ 
                scale: 1.05,
                rotateY: -5,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <GlowButton href="#impact" className="w-full sm:w-auto text-center !bg-white/0">See Impact</GlowButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating particles - reduced on mobile for performance */}
      {[...Array(20)].map((_, i) => {
        // Use consistent values to avoid hydration mismatch
        const baseX = (i * 7) % 100 - 50;
        const baseY = (i * 11) % 100 - 50;
        const duration = 3 + (i % 3);
        const delay = (i % 4) * 0.5;
        
        return (
          <motion.div
            key={i}
            style={{
              x: particleX,
              y: particleScrollY
            }}
            className="absolute w-1 h-1 bg-chili-red/40 dark:bg-tamarind-orange/30 rounded-full hidden sm:block"
            animate={{
              x: [0, baseX, 0],
              y: [0, baseY, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay
            }}
          />
        );
      })}
    </section>
  );
}
