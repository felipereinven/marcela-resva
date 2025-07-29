import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Instagram browser compatibility check
function detectInstagramBrowser() {
  const userAgent = navigator.userAgent || '';
  return userAgent.includes('Instagram') || 
         userAgent.includes('FBAN') || 
         userAgent.includes('FBAV');
}

// Add Instagram-specific fixes
if (detectInstagramBrowser()) {
  // Force reload if Instagram browser has issues
  document.addEventListener('DOMContentLoaded', () => {
    const meta = document.createElement('meta');
    meta.name = 'instagram-compatible';
    meta.content = 'true';
    document.head.appendChild(meta);
  });
  
  // Handle Instagram browser navigation issues
  window.addEventListener('load', () => {
    // Prevent Instagram from caching stale content
    if (performance.navigation.type === performance.navigation.TYPE_BACK_FORWARD) {
      window.location.reload();
    }
  });
}

createRoot(document.getElementById("root")!).render(<App />);
