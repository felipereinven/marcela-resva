import { ParticleBackground } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import marcelaLogo from "@/assets/marcela-resva-logo.webp";
import marcelaPhoto from "@/assets/22_1752622341890.jpg";
import shiftingSoulsLogo from "@assets/IMG_0195-e1752623802409_1752623855399.webp";
import { Calendar, MapPin } from "lucide-react";

export default function Eventos() {
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
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl lg:text-6xl font-cormorant font-bold leading-tight mb-6 text-white">
            Eventos que despiertan el alma
          </h1>
          <p className="text-lg text-white/90 uppercase tracking-wider mb-8 font-medium">
            CREANDO ESPACIOS SAGRADOS DONDE EL ALMA PUEDA RECORDAR SU VERDAD, ABRIRSE AL AMOR Y RECIBIR LA GUÍA DEL CIELO. CADA EVENTO NACE DESDE UNA PROFUNDA CONEXIÓN CON LO DIVINO Y CON EL PROPÓSITO DE ACOMPAÑARTE EN TU CAMINO DE SANACIÓN, DESPERTAR Y EXPANSIÓN.
          </p>
          <div className="text-white/95 leading-relaxed space-y-6 text-lg">
            <p>
              Estoy creando espacios sagrados donde el alma pueda recordar su verdad, abrirse al amor y recibir la guía del cielo. Cada evento nace desde una profunda conexión con lo divino y con el propósito de acompañarte en tu camino de sanación, despertar y expansión.
            </p>
            <p>
              A lo largo del año, comparto experiencias presenciales que ocurren en distintas ciudades y lugares del alma. Espacios donde nos encontramos para sanar, conectar y transformar la energía juntos.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 my-8 border border-white/20">
              <p className="font-cormorant text-2xl mb-4 text-yellow-200">Entre las experiencias que estoy gestando encontrarás:</p>
              <ul className="text-left space-y-3 max-w-2xl mx-auto">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-300 mt-1">✦</span>
                  <span>Ceremonias de conexión angelical</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-300 mt-1">✦</span>
                  <span>Charlas conscientes sobre el alma, la reencarnación y el propósito de vida</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-300 mt-1">✦</span>
                  <span>Talleres vivenciales de sanación energética y canalización</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-300 mt-1">✦</span>
                  <span>Encuentros grupales para el renacer del útero y la reconexión espiritual</span>
                </li>
              </ul>
            </div>
            <p className="font-medium text-xl italic">
              Cada encuentro es una invitación a recordar que no estamos solos, que el cielo nos acompaña y que cuando nos reunimos en amor, la transformación sucede.
            </p>
            <p className="text-yellow-200 font-semibold">
              Explorá los próximos eventos y sentí cuál resuena con tu alma.
            </p>
          </div>
        </div>
      </section>

      {/* Calendario de Eventos */}
      <section className="py-16 px-4 relative z-10 bg-black/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-cormorant font-bold text-white mb-4">
            Calendario de Eventos
          </h2>
          <p className="text-white/80 uppercase tracking-wide mb-12">
            ENTÉRATE DE LOS PRÓXIMOS ENCUENTROS ONLINE Y/O PRESENCIALES CON MARCELA RESTREPO.
          </p>
          
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-12 border border-white/30 shadow-xl">
            <div className="flex flex-col items-center justify-center py-12">
              <Calendar className="w-16 h-16 text-white/50 mb-6" />
              <p className="text-2xl text-white font-cormorant">
                No hay próximos eventos en este momento
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Eventos Pasados */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-cormorant font-bold text-white mb-12 text-center">
            Eventos Pasados
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <img 
                src={marcelaPhoto} 
                alt="Evento Ciudad de México" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="text-white">
              <h3 className="text-3xl font-cormorant font-bold mb-4 text-yellow-200">
                Ciudad de México: Sanando mi Linaje Femenino
              </h3>
              <p className="text-white/90 leading-relaxed mb-6">
                Un encuentro profundo de sanación y reconexión con nuestras raíces ancestrales. 
                Juntas creamos un espacio sagrado para liberar memorias, honrar a nuestras ancestras 
                y despertar la fuerza femenina que habita en cada una de nosotras.
              </p>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="w-5 h-5 text-yellow-300" />
                <span>Ciudad de México</span>
              </div>
            </div>
          </div>

          {/* Galería */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <img 
                  src={marcelaPhoto} 
                  alt={`Evento pasado ${item}`} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lleva La Luz A Tu Comunidad */}
      <section className="py-20 px-4 relative z-10 bg-white/10 backdrop-blur-md">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl lg:text-5xl font-cormorant font-bold text-white mb-6">
            Lleva La Luz A Tu Comunidad Con Marcela Restrepo
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            ¿Te gustaría organizar un evento con Marcela Restrepo en tu ciudad, tu empresa o tu espacio de transformación?
          </p>
          <p className="text-lg text-white/80 mb-10">
            Completá el formulario a continuación y comenzamos a soñar junt@s.
          </p>
          
          <Button 
            className="text-white font-bold py-6 px-12 rounded-full text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            style={{
              background: "linear-gradient(to right, #ae667d, #976e73)",
              boxShadow: "0 10px 25px rgba(174, 102, 125, 0.3)"
            }}
            onClick={() => window.location.href = "mailto:contacto@marcelaresva.com"}
          >
            CONTACTANOS
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-lg border-t border-white/20 py-12 px-4 mt-0">
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
