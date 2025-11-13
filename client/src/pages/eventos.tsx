import { ParticleBackground } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import marcelaLogo from "@/assets/marcela-resva-logo.webp";
import shiftingSoulsLogo from "@assets/IMG_0195-e1752623802409_1752623855399.webp";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

export default function Eventos() {
  const eventos = [
    {
      id: 1,
      title: "Retiro Espiritual: Despertar del Alma",
      location: "Ciudad de México, México",
      date: "15-17 de Marzo, 2025",
      time: "9:00 AM - 6:00 PM",
      description: "Tres días intensivos de transformación espiritual en el corazón de México. Reconecta con tu divinidad a través de meditaciones canalizadas, ceremonias sagradas y prácticas de sanación profunda.",
      highlights: [
        "Meditaciones canalizadas en vivo",
        "Ceremonia de liberación energética",
        "Círculo de mujeres y sanación colectiva",
        "Kit de herramientas espirituales"
      ],
      spots: "20 lugares disponibles",
      price: "$4,500 MXN",
      image: "🇲🇽"
    },
    {
      id: 2,
      title: "Taller: Conecta con tu Misión de Vida",
      location: "Medellín, Colombia",
      date: "5-7 de Abril, 2025",
      time: "10:00 AM - 5:00 PM",
      description: "Un encuentro transformador en la ciudad de la eterna primavera. Descubre tu propósito divino y aprende a transformar cada límite en expansión a través de técnicas canalizadas.",
      highlights: [
        "Sesiones de canalización grupal",
        "Activación de propósito de vida",
        "Prácticas de conexión angelical",
        "Acompañamiento personalizado"
      ],
      spots: "15 lugares disponibles",
      price: "$800,000 COP",
      image: "🇨🇴"
    }
  ];

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
              <a href="/eventos" className="text-white/90 hover:text-white transition-colors font-medium">
                Eventos
              </a>
              <a href="/citas" className="text-white/90 hover:text-white transition-colors font-medium">
                Citas
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {/* Title Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-cormorant font-bold leading-tight mb-6" style={{color: '#f6e3eb'}}>
              Eventos <span className="text-yellow-300">Presenciales</span>
            </h1>
            <p className="text-xl text-white/95 leading-relaxed max-w-3xl mx-auto">
              Únete a nuestros retiros y talleres transformadores. Experiencias únicas de sanación y conexión espiritual guiadas por Marcela ResVa.
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {eventos.map((evento) => (
              <div 
                key={evento.id}
                className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-xl hover:bg-white/25 transition-all duration-300 hover:transform hover:scale-[1.02]"
              >
                {/* Event Header */}
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{evento.image}</div>
                  <h2 className="text-3xl font-cormorant font-bold mb-3 text-yellow-300">
                    {evento.title}
                  </h2>
                </div>

                {/* Event Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 text-white/95">
                    <MapPin className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-1" />
                    <span className="text-lg">{evento.location}</span>
                  </div>
                  
                  <div className="flex items-start gap-3 text-white/95">
                    <Calendar className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-1" />
                    <span className="text-lg">{evento.date}</span>
                  </div>
                  
                  <div className="flex items-start gap-3 text-white/95">
                    <Clock className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-1" />
                    <span className="text-lg">{evento.time}</span>
                  </div>
                  
                  <div className="flex items-start gap-3 text-white/95">
                    <Users className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-1" />
                    <span className="text-lg font-semibold">{evento.spots}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/90 leading-relaxed mb-6">
                  {evento.description}
                </p>

                {/* Highlights */}
                <div className="bg-white/10 rounded-xl p-5 mb-6">
                  <h3 className="text-lg font-cormorant font-bold text-yellow-300 mb-3">
                    Incluye:
                  </h3>
                  <ul className="space-y-2">
                    {evento.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-white/90">
                        <span className="text-yellow-300">✦</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price and CTA */}
                <div className="text-center">
                  <div className="text-3xl font-cormorant font-bold text-yellow-300 mb-4">
                    {evento.price}
                  </div>
                  <Button 
                    data-testid={`button-register-event-${evento.id}`}
                    className="w-full text-white font-bold py-4 px-8 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    style={{
                      background: "linear-gradient(to right, #ae667d, #976e73)",
                      boxShadow: "0 10px 25px rgba(174, 102, 125, 0.3)"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "linear-gradient(to right, #976e73, #b09196)";
                      e.currentTarget.style.boxShadow = "0 15px 35px rgba(174, 102, 125, 0.4)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "linear-gradient(to right, #ae667d, #976e73)";
                      e.currentTarget.style.boxShadow = "0 10px 25px rgba(174, 102, 125, 0.3)";
                    }}
                  >
                    <i className="fas fa-ticket-alt mr-2"></i>
                    Reservar mi lugar
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-xl">
              <h3 className="text-2xl font-cormorant font-bold text-white mb-4">
                ¿Tienes preguntas sobre los eventos?
              </h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                Contáctanos para más información sobre fechas, ubicaciones específicas y formas de pago. 
                Estamos aquí para acompañarte en tu proceso de transformación.
              </p>
              <a 
                href="/citas"
                className="inline-block text-yellow-300 hover:text-yellow-200 font-semibold transition-colors"
              >
                Agenda una sesión informativa →
              </a>
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
