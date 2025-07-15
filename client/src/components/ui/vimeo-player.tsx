import { useEffect, useRef } from "react";

interface VimeoPlayerProps {
  videoId: string;
  title: string;
}

export function VimeoPlayer({ videoId, title }: VimeoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing iframe
    container.innerHTML = '';

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = `https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479`;
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.borderRadius = '16px';
    iframe.title = title;

    container.appendChild(iframe);

    // Load Vimeo player script
    if (!document.querySelector('script[src="https://player.vimeo.com/api/player.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, [videoId, title]);

  return (
    <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
      <div ref={containerRef} />
    </div>
  );
}
