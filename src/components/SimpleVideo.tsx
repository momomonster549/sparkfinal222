"use client";

const VIDEO_URL = "https://cqxporsfudzigeimzawn.supabase.co/storage/v1/object/sign/website-assets-video/Igniting%20Creative%20Change!.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmNkMDYzYy1mYzcwLTQ5ZmMtOTEzMS0zMDUyOTU1MzRiZGMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy12aWRlby9JZ25pdGluZyBDcmVhdGl2ZSBDaGFuZ2UhLm1wNCIsImlhdCI6MTc1OTUzMDcwMywiZXhwIjoxNzkxMDY2NzAzfQ.zfZzbpeaRDMLc0--WZz3CLDIfezj1dpSAbA1TWrTpC4";

export default function SimpleVideo() {
  return (
    <div className="fixed inset-0 z-0">
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        onError={(e) => {
          console.error('SimpleVideo error:', e);
        }}
        onPlay={() => {
          console.log('SimpleVideo is playing!');
        }}
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
