import { VimeoPlayer } from "@/components/ui/vimeo-player";
import { ParticleBackground } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import marcelaLogo from "@/assets/marcela-resva-logo.webp";

export default function ThankYou() {
  const whatsappGroupUrl = "https://chat.whatsapp.com/tu-grupo-de-whatsapp";

  return (
    <div className="min-h-screen font-poppins" style={{background: "linear-gradient(135deg, #976e73 0%, #ae667d 50%, #b09196 100%)"}}>
      <ParticleBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8 md:py-4">
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
                ¡Recibiste tus 4 regalos!
              </h2>
              <p className="text-white/95 mb-6">
                Revisa tu email para acceder a las herramientas que te ayudarán a reconectar con tu divinidad y descubrir tu misión de vida. Tu transformación espiritual comienza ahora.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 md:mb-0">
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-pink-300 to-rose-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-microphone text-white text-lg"></i>
                  </div>
                  <h3 className="text-xl font-cormorant font-bold text-yellow-300 mb-3">Audio Canalizado</h3>
                  <p className="text-white/90 leading-relaxed text-sm">De 2 minutos y 16 segundos que la divinidad te entrega hoy. Es la apertura a que te des el permiso de abrir puertas donde antes había muros.</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-pink-300 to-rose-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-video text-white text-lg"></i>
                  </div>
                  <h3 className="text-xl font-cormorant font-bold text-yellow-300 mb-3">Video La Energía del Pétalo</h3>
                  <p className="text-white/90 leading-relaxed text-sm">Es la continuidad del audio canalizado para conectar tu ser a tu voz y a tu corazón.</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-pink-300 to-rose-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-rocket text-white text-lg"></i>
                  </div>
                  <h3 className="text-xl font-cormorant font-bold text-yellow-300 mb-3">Cápsulas de Acción</h3>
                  <p className="text-white/90 leading-relaxed text-sm">Impulsos continuos en tu bandeja de entrada que te llevarán a actuar.</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-pink-300 to-rose-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-users text-white text-lg"></i>
                  </div>
                  <h3 className="text-xl font-cormorant font-bold text-yellow-300 mb-3">Comunidad Shifting Souls</h3>
                  <p className="text-white/90 leading-relaxed text-sm">Acceso a oportunidades exclusivas, nadie se entera antes que tú.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
