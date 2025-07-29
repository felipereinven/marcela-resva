import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function InstagramCompatibility() {
  const [isInstagram, setIsInstagram] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || '';
    const isInstagramBrowser = userAgent.includes('Instagram') || 
                               userAgent.includes('FBAN') || 
                               userAgent.includes('FBAV');
    
    setIsInstagram(isInstagramBrowser);
    
    if (isInstagramBrowser) {
      // Show fallback after 3 seconds if there are loading issues
      const timer = setTimeout(() => {
        setShowFallback(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const openInExternalBrowser = () => {
    const currentUrl = window.location.href;
    
    // Try to open in external browser
    const fallbackUrls = [
      `googlechrome://navigate?url=${encodeURIComponent(currentUrl)}`,
      `firefox://open-url?url=${encodeURIComponent(currentUrl)}`,
      `microsoft-edge:${currentUrl}`
    ];
    
    // Show instructions for manual opening
    const instructions = `
Para una mejor experiencia, copia este enlace y ábrelo en tu navegador favorito:

${currentUrl}

¿Problemas? Prueba estos pasos:
1. Toca los tres puntos (...) en la esquina superior
2. Selecciona "Abrir en navegador"
3. O copia el enlace y pégalo en Chrome, Safari o Firefox
    `;
    
    alert(instructions);
  };

  if (!isInstagram || !showFallback) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-black p-4 text-center">
      <div className="max-w-md mx-auto">
        <p className="text-sm font-semibold mb-2">
          ¿Problemas para ver la página desde Instagram?
        </p>
        <Button 
          onClick={openInExternalBrowser}
          size="sm"
          className="bg-black text-yellow-500 hover:bg-gray-800"
        >
          Abrir en tu navegador
        </Button>
      </div>
    </div>
  );
}