import { VimeoPlayer } from "@/components/ui/vimeo-player";
import { ParticleBackground } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";

export default function ThankYou() {
  const whatsappGroupUrl = "https://chat.whatsapp.com/tu-grupo-de-whatsapp";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 font-poppins">
      <ParticleBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-warm-gold to-rose-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-heart text-white text-3xl"></i>
            </div>
            <h1 className="text-5xl font-cormorant font-bold text-white mb-4">
              ¡Bienvenida a la Comunidad!
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Tu transformación espiritual comienza ahora. Aquí tienes un mensaje especial para ti:
            </p>
          </div>

          <div className="relative mb-12">
            <div className="absolute -inset-4 bg-gradient-to-r from-celestial-blue/30 to-mystic-purple/30 rounded-3xl blur-2xl"></div>
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <VimeoPlayer videoId="1101676211" title="Landing page Aprobada" />
            </div>
          </div>

          <div className="text-center space-y-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h2 className="text-3xl font-cormorant font-bold text-white mb-4">
                Tu próximo paso
              </h2>
              <p className="text-white/80 mb-6">
                Únete a nuestro grupo de WhatsApp donde compartimos inspiración diaria, respuestas a preguntas frecuentes y conectamos con otras almas en transformación.
              </p>
              
              <Button
                asChild
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <a href={whatsappGroupUrl} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp text-2xl mr-3"></i>
                  Únete al Grupo de WhatsApp
                </a>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <i className="fas fa-envelope text-warm-gold text-2xl mb-4"></i>
                <h3 className="text-white font-semibold mb-2">Revisa tu Email</h3>
                <p className="text-white/80 text-sm">Recibirás un email de confirmación con los próximos pasos</p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <i className="fas fa-calendar text-warm-gold text-2xl mb-4"></i>
                <h3 className="text-white font-semibold mb-2">Próxima Sesión</h3>
                <p className="text-white/80 text-sm">Sesión "Pregúntale a tus Ángeles" este viernes a las 7 PM</p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <i className="fas fa-gift text-warm-gold text-2xl mb-4"></i>
                <h3 className="text-white font-semibold mb-2">Regalo de Bienvenida</h3>
                <p className="text-white/80 text-sm">Meditación guiada gratuita en tu bandeja de entrada</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
