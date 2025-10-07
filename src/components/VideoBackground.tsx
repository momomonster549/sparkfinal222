"use client";
import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  videoUrl?: string;
}

export default function VideoBackground({ 
  videoUrl = "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/videos-website-assets/sparkcreativesinc/Igniting%20Creative%20Change!.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlb3Mtd2Vic2l0ZS1hc3NldHMvc3BhcmtjcmVhdGl2ZXNpbmMvSWduaXRpbmcgQ3JlYXRpdmUgQ2hhbmdlIS5tcDQiLCJpYXQiOjE3NTk4NTY4MTksImV4cCI6MzQ5NDMzNjgxOX0.aVQFJmnhdWb68Ocftx6H76rt56PlwV0mYTq6Uo6crN4" 
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log('VideoBackground: Component mounted with videoUrl:', videoUrl);
  }, []);

  // Force video to play - similar to VideoHero
  useEffect(() => {
    if (videoRef.current && mounted) {
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
          console.log('VideoBackground: Attempting to play video...');
          await video.play();
          console.log('VideoBackground: Video play successful!');
          setVideoStarted(true);
        } catch (error) {
          console.error('VideoBackground: Video play failed:', error);
          setVideoError(true);
        }
      };

      // Try to play when metadata loads
      video.addEventListener('loadedmetadata', () => {
        console.log('VideoBackground: Video metadata loaded');
        playVideo();
      });

      // Try to play when data loads
      video.addEventListener('loadeddata', () => {
        console.log('VideoBackground: Video data loaded');
        playVideo();
      });

      // Try to play when can play
      video.addEventListener('canplay', () => {
        console.log('VideoBackground: Video can play');
        playVideo();
      });

      return () => {
        video.removeEventListener('loadedmetadata', playVideo);
        video.removeEventListener('loadeddata', playVideo);
        video.removeEventListener('canplay', playVideo);
      };
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0">
      {/* Fallback background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-peach-sand to-maize dark:from-[#0A0B10] dark:via-[#1A1B20] dark:to-[#2A1B30]" />
      
      {/* Video Background */}
      {!videoError && (
        <div className="absolute inset-0">
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
              console.error('VideoBackground: Video error details:', {
                error: target.error,
                errorCode: target.error?.code,
                errorMessage: target.error?.message,
                networkState: target.networkState,
                readyState: target.readyState,
                src: target.currentSrc || target.src,
                videoUrl: videoUrl
              });
              setVideoError(true);
            }}
            onLoadStart={() => {
              console.log('VideoBackground: Video load started');
            }}
            onPlay={() => {
              console.log('VideoBackground: VIDEO IS PLAYING!');
            }}
            onPause={() => {
              console.log('VideoBackground: Video paused');
            }}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      )}
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
    </div>
  );
}