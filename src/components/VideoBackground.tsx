"use client";
import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  videoUrl?: string;
}

export default function VideoBackground({ 
  videoUrl = "https://cqxporsfudzigeimzawn.supabase.co/storage/v1/object/sign/website-assets-video/Igniting%20Creative%20Change!.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmNkMDYzYy1mYzcwLTQ5ZmMtOTEzMS0zMDUyOTU1MzRiZGMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy12aWRlby9JZ25pdGluZyBDcmVhdGl2ZSBDaGFuZ2UhLm1wNCIsImlhdCI6MTc1OTc3NzQxMywiZXhwIjozNDk0MjU3NDEzfQ.bq0st5-ZLFC6cq_yR34hVjuTwr_i_BvknxRlGiBiyto" 
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
                networkState: target.networkState,
                readyState: target.readyState,
                src: target.currentSrc || target.src
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
      
      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 left-4 bg-black/80 text-white p-2 rounded text-xs z-50">
          <div>Video Error: {videoError ? 'Yes' : 'No'}</div>
          <div>Video Started: {videoStarted ? 'Yes' : 'No'}</div>
          <div>Mounted: {mounted ? 'Yes' : 'No'}</div>
        </div>
      )}
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
    </div>
  );
}