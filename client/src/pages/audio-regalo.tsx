import { ParticleBackground } from '@/components/ui/particles';
import { Button } from '@/components/ui/button';
import audioFile from '@assets/Regalo-_Mensaje_Canalizado__1755550542754.mp3';
import marcelaLogo from '@assets/Marcela-ResVa-05-e1752018349922_1752620492878.webp';
import { useLocation } from 'wouter';
import { useEffect } from 'react';

export function AudioRegalo() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigateWithScroll = (path: string) => {
    setLocation(path);
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  return (
    <div className="min-h-screen font-poppins" style={{background: "linear-gradient(135deg, #976e73 0%, #ae667d 50%, #b09196 100%)"}}>
      <ParticleBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/15 backdrop-blur-xl border-b border-white/30 transition-all duration-300 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={marcelaLogo} 
                alt="Marcela ResVa Logo" 
                className="h-10 w-auto"
              />
            </div>
            <Button 
              onClick={() => navigateWithScroll('/')}
              variant="ghost"
              className="text-white/90 hover:text-white hover:bg-white/10"
            >
              ← Volver al inicio
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="pt-32 pb-16 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-cormorant font-bold leading-tight mb-6" style={{color: '#f6e3eb'}}>
              <span className="text-yellow-300">Tu Regalo:</span> Mensaje Canalizado
            </h1>
            <p className="text-xl text-white/95 leading-relaxed max-w-3xl mx-auto mb-8">
              De 2 minutos y 16 segundos que la divinidad te entrega hoy. Es la apertura a que te des el permiso de abrir puertas donde antes había muros.
            </p>
          </div>

          {/* Audio Player Section */}
          <div className="relative mb-12">
            <div className="absolute -inset-4 rounded-3xl blur-2xl" style={{background: 'linear-gradient(to right, rgba(178, 173, 168, 0.3), rgba(187, 165, 161, 0.3))'}}></div>
            <div className="relative bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-xl">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-microphone text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-cormorant font-bold text-white mb-2">
                  Audio Canalizado Especial
                </h3>
                <p className="text-white/80">
                  Escucha este mensaje que la divinidad tiene para ti
                </p>
              </div>
              
              <div className="bg-white/10 rounded-2xl p-6">
                <audio 
                  controls 
                  className="w-full"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px'
                  }}
                >
                  <source src={audioFile} type="audio/mpeg" />
                  Tu navegador no soporta el elemento de audio.
                </audio>
              </div>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="relative mb-12">
            <div className="absolute -inset-4 rounded-3xl blur-2xl" style={{background: 'linear-gradient(to right, rgba(178, 173, 168, 0.3), rgba(187, 165, 161, 0.3))'}}></div>
            <div className="relative bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-xl">
              <h3 className="text-2xl font-cormorant font-bold text-center mb-6" style={{color: '#f6e3eb'}}>
                Cómo aprovechar este regalo
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: "fas fa-headphones",
                    title: "Escucha con atención",
                    description: "Encuentra un lugar tranquilo donde puedas conectar contigo misma"
                  },
                  {
                    icon: "fas fa-heart",
                    title: "Abre tu corazón",
                    description: "Permite que el mensaje resuene en tu interior sin resistencia"
                  },
                  {
                    icon: "fas fa-repeat",
                    title: "Escucha las veces necesarias",
                    description: "Cada vez que lo escuches, recibirás nuevas revelaciones"
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-pink-300 to-rose-300 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className={`${item.icon} text-white text-lg`}></i>
                    </div>
                    <h4 className="font-semibold text-lg mb-2 text-white">{item.title}</h4>
                    <p className="text-sm text-white/80 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-center">
            <h3 className="text-2xl font-cormorant font-bold mb-6" style={{color: '#f6e3eb'}}>
              Continúa tu transformación
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigateWithScroll('/video-regalo')}
                className="px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-2 text-lg"
                style={{
                  backgroundColor: '#f6e3eb',
                  color: '#976e73',
                  borderColor: '#f6e3eb'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#bba5a1';
                  e.currentTarget.style.color = '#f6e3eb';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#f6e3eb';
                  e.currentTarget.style.color = '#976e73';
                }}
              >
                Ver Video del Pétalo →
              </Button>
              <Button 
                onClick={() => navigateWithScroll('/membresia')}
                className="px-8 py-4 rounded-full font-bold border-2 text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: 'transparent',
                  color: '#f6e3eb',
                  borderColor: '#f6e3eb'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f6e3eb';
                  e.currentTarget.style.color = '#976e73';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#f6e3eb';
                }}
              >
                Explorar Membresía
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-sm text-white/70">
              © 2025 Marcela ResVa. Todos los derechos reservados. 
              <br />
              Diseño por Felipe Reinven
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}