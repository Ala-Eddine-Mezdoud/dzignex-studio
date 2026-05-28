"use client";
import { useRef, useState } from "react";

export default function VideoPlayer({ src, poster }: { src: string; poster?: string }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    videoRef.current?.play();
  };

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden cursor-pointer group">
      {/* Thumbnail */}
      {!playing && poster && (
        <img
          src={poster}
          alt="Video thumbnail"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Play overlay */}
      {!playing && (
        <div
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/55 transition-colors"
        >
          <div className="w-20 h-20 rounded-full border-2 border-white/80 bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
            {/* Triangle play icon */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <polygon points="6,3 21,12 6,21" />
            </svg>
          </div>
        </div>
      )}

      {/* Native video player */}
      <video
        ref={videoRef}
        src={src}
        controls
        className={`absolute inset-0 w-full h-full ${playing ? "block" : "hidden"}`}
      />
    </div>
  );
}