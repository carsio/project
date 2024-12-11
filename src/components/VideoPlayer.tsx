import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { useVideoPlayer } from '../hooks/useVideoPlayer';

interface VideoPlayerProps {
  src: string;
}

export function VideoPlayer({ src }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { initializeHLS } = useVideoPlayer();

  useEffect(() => {
    if (videoRef.current) {
      initializeHLS(videoRef.current, src);
    }
  }, [src, initializeHLS]);

  return (
    <div className="relative bg-black rounded-lg overflow-hidden aspect-video mb-6">
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
        playsInline
      />
    </div>
  );
}