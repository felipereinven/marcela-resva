import { VimeoPlayer } from "@/components/ui/vimeo-player";
import { ParticleBackground } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import marcelaLogo from "@/assets/marcela-resva-logo.webp";

export default function ThankYou() {
  const whatsappGroupUrl = "https://chat.whatsapp.com/tu-grupo-de-whatsapp";

  return (
    <div className="min-h-screen font-poppins" style={{background: "linear-gradient(135deg, #976e73 0%, #ae667d 50%, #b09196 100%)"}}>
      <ParticleBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <img 
                src={marcelaLogo} 
                alt="Marcela ResVa Logo" 
                className="h-16 w-auto"
              />
            </div>
            <h1 className="text-5xl font-cormorant font-bold text-white mb-4">
              ¡Bienvenida a la Comunidad!
            </h1>
            <p className="text-xl text-white/95 mb-8">
              Tu transformación espiritual comienza ahora. Aquí tienes un mensaje especial para ti:
            </p>
          </div>



          <div className="text-center space-y-8">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-xl">
              <h2 className="text-3xl font-cormorant font-bold text-white mb-4">
                ¡Ya eres parte de Shifting Souls!
              </h2>
              <p className="text-white/95 mb-6">
                Tu transformación espiritual ha comenzado. Pronto recibirás contenido exclusivo y todo lo que necesitas para tu proceso de evolución.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-lg">
                <i className="fas fa-envelope text-dusty-rose text-2xl mb-4"></i>
                <h3 className="text-white font-semibold mb-2">Revisa tu Email</h3>
                <p className="text-white/95 text-sm">Recibirás un email de confirmación con los próximos pasos</p>
              </div>

              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-lg">
                <i className="fas fa-calendar text-dusty-rose text-2xl mb-4"></i>
                <h3 className="text-white font-semibold mb-2">Próxima Sesión</h3>
                <p className="text-white/95 text-sm">Sesión "Pregúntale a tus Ángeles" este viernes a las 7 PM</p>
              </div>

              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-lg">
                <i className="fas fa-gift text-dusty-rose text-2xl mb-4"></i>
                <h3 className="text-white font-semibold mb-2">Regalo de Bienvenida</h3>
                <p className="text-white/95 text-sm">Meditación guiada gratuita en tu bandeja de entrada</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
