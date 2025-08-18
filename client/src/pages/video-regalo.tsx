import { ParticleBackground } from '@/components/ui/particles';
import { Button } from '@/components/ui/button';
import marcelaLogo from '@assets/Marcela-ResVa-05-e1752018349922_1752620492878.webp';
import { useLocation } from 'wouter';

export function VideoRegalo() {
  const [, setLocation] = useLocation();

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
              onClick={() => setLocation('/')}
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
              <span className="text-yellow-300">Tu Regalo:</span> La Energía del Pétalo
            </h1>
            <p className="text-xl text-white/95 leading-relaxed max-w-3xl mx-auto mb-8">
              Es la continuidad del audio canalizado para conectar tu ser a tu voz y a tu corazón.
            </p>
          </div>

          {/* Video Player Section */}
          <div className="relative mb-12">
            <div className="absolute -inset-4 rounded-3xl blur-2xl" style={{background: 'linear-gradient(to right, rgba(178, 173, 168, 0.3), rgba(187, 165, 161, 0.3))'}}></div>
            <div className="relative bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-xl">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400 via-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-video text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-cormorant font-bold text-white mb-2">
                  Video Especial: La Energía del Pétalo
                </h3>
                <p className="text-white/80">
                  Conecta con tu esencia más profunda a través de esta experiencia transformadora
                </p>
              </div>
              
              <div className="bg-white/10 rounded-2xl p-4">
                <div style={{padding:"56.25% 0 0 0", position:"relative"}}>
                  <iframe 
                    src="https://player.vimeo.com/video/1111093065?badge=0&autopause=0&player_id=0&app_id=58479" 
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    style={{position:"absolute", top:0, left:0, width:"100%", height:"100%", borderRadius:"12px"}} 
                    title="Regalo de Energia de petalo"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="relative mb-12">
            <div className="absolute -inset-4 rounded-3xl blur-2xl" style={{background: 'linear-gradient(to right, rgba(178, 173, 168, 0.3), rgba(187, 165, 161, 0.3))'}}></div>
            <div className="relative bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-xl">
              <h3 className="text-2xl font-cormorant font-bold text-center mb-6" style={{color: '#f6e3eb'}}>
                Lo que experimentarás con este video
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: "fas fa-heart-pulse",
                    title: "Conexión profunda",
                    description: "Reconecta con tu voz interior y la sabiduría de tu corazón"
                  },
                  {
                    icon: "fas fa-seedling",
                    title: "Crecimiento espiritual",
                    description: "Permite que tu esencia florezca como un pétalo que se abre al sol"
                  },
                  {
                    icon: "fas fa-sparkles",
                    title: "Transformación energética",
                    description: "Eleva tu vibración y alinéate con tu propósito de vida"
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

          {/* Integration Tips */}
          <div className="relative mb-12">
            <div className="absolute -inset-4 rounded-3xl blur-2xl" style={{background: 'linear-gradient(to right, rgba(178, 173, 168, 0.3), rgba(187, 165, 161, 0.3))'}}></div>
            <div className="relative bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-xl">
              <h3 className="text-2xl font-cormorant font-bold text-center mb-6" style={{color: '#f6e3eb'}}>
                Cómo integrar esta experiencia
              </h3>
              <div className="space-y-4">
                {[
                  "Después de ver el video, tómate unos minutos para respirar profundamente",
                  "Escribe en un diario las sensaciones o insights que experimentaste",
                  "Practica la conexión con tu voz interior diariamente por 5 minutos",
                  "Recuerda que cada vez que veas el video, recibirás nuevas revelaciones"
                ].map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold text-purple-800">{index + 1}</span>
                    </div>
                    <p className="text-white/90 leading-relaxed">{tip}</p>
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
                onClick={() => setLocation('/audio-regalo')}
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
                ← Escuchar Audio Canalizado
              </Button>
              <Button 
                onClick={() => setLocation('/membresia')}
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