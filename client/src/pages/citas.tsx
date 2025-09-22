import { useEffect } from "react";
import { ParticleBackground } from "@/components/ui/particles";
import marcelaLogo from "@/assets/marcela-resva-logo.webp";
import shiftingSoulsLogo from "@assets/IMG_0195-e1752623802409_1752623855399.webp";

export default function Citas() {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        if (window.scrollY > 100) {
          nav.classList.add('bg-black/30');
        } else {
          nav.classList.remove('bg-black/30');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <div className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-white/90 hover:text-white transition-colors font-medium">
                Inicio
              </a>
              <a href="/membresia" className="text-white/90 hover:text-white transition-colors font-medium">
                Membresía
              </a>
              <a href="/citas" className="text-white/90 hover:text-white transition-colors font-medium">
                Citas
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-8 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-cormorant font-bold leading-tight mb-6" style={{color: '#f6e3eb'}}>
              Agenda tu <span className="text-yellow-300">Cita Personal</span> con Marcela
            </h1>
            <p className="text-lg text-white/95 leading-relaxed max-w-3xl mx-auto mb-8">
              Reserva tu sesión personalizada para transformar tu crisis espiritual en despertar consciente. 
              Marcela te acompañará en tu proceso de reconexión con tu divinidad.
            </p>
          </div>

          {/* Calendly Widget Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-xl">
              <div className="bg-white rounded-2xl overflow-hidden">
                {/* Calendly Inline Widget */}
                <div 
                  className="calendly-inline-widget" 
                  data-url="https://calendly.com/shiftingsoulsonline?primary_color=cf9d7a" 
                  style={{minWidth: '320px', height: '700px'}}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-lg border-t border-white/20 py-12 px-4 mt-16">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <img 
                  src={shiftingSoulsLogo} 
                  alt="Shifting Souls Logo" 
                  className="w-12 h-12 rounded-full" 
                />
                <h3 className="text-2xl font-cormorant font-bold text-white">Shifting Souls</h3>
              </div>
              <p className="text-white/70 text-sm">
                Acompañando a mujeres en su transformación espiritual hacia una vida alineada con su alma.
              </p>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/60 text-sm">
              © 2025 Shifting Souls. Todos los derechos reservados. Con amor desde el corazón.
            </p>
            <p className="text-white/50 text-xs mt-2">
              Design By Felipe Reinven
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}