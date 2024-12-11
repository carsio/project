import { useCallback } from 'react';
import Hls from 'hls.js';

export function useVideoPlayer() {
  const initializeHLS = useCallback((videoElement: HTMLVideoElement, src: string) => {
    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      
      hls.loadSource(src);
      hls.attachMedia(videoElement);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoElement.play().catch((error) => {
          console.log("Playback failed:", error);
        });
      });
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = src;
      videoElement.addEventListener('loadedmetadata', () => {
        videoElement.play().catch((error) => {
          console.log("Playback failed:", error);
        });
      });
    }
  }, []);

  return { initializeHLS };
}