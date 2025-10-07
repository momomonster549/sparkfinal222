"use client";

const VIDEO_URL = "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/videos-website-assets/sparkcreativesinc/Igniting%20Creative%20Change!.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlb3Mtd2Vic2l0ZS1hc3NldHMvc3BhcmtjcmVhdGl2ZXNpbmMvSWduaXRpbmcgQ3JlYXRpdmUgQ2hhbmdlIS5tcDQiLCJpYXQiOjE3NTk4NTY4MTksImV4cCI6MzQ5NDMzNjgxOX0.aVQFJmnhdWb68Ocftx6H76rt56PlwV0mYTq6Uo6crN4";

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
