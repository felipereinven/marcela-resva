import { ParticleBackground } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import marcelaLogo from "@assets/Marcela-ResVa-05-e1752018349922_1752620492878.webp";
import { useEffect } from 'react';

export default function ThankYou() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen font-poppins" style={{background: "linear-gradient(135deg, #976e73 0%, #ae667d 50%, #b09196 100%)"}}>
      <ParticleBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/15 backdrop-blur-xl border-b border-white/30 transition-all duration-300 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <img 
                src={marcelaLogo} 
                alt="Marcela ResVa Logo" 
                className="h-10 w-auto"
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-24">
        <div className="container mx-auto max-w-5xl">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="relative inline-block">
              <div className="absolute -inset-4 rounded-full blur-xl bg-yellow-300/30"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <i className="fas fa-envelope-open text-white text-3xl"></i>
              </div>
            </div>
            <h1 className="text-5xl lg:text-6xl font-cormorant font-bold mb-4 text-white">
              <span className="text-yellow-300">ÚLTIMO PASO</span>
            </h1>
            <p className="text-2xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
              Tu transformación espiritual está a un clic de distancia
            </p>
          </div>

          {/* Main Instruction Card */}
          <div className="relative mb-12">
            <div className="absolute -inset-6 rounded-4xl blur-3xl" style={{background: 'linear-gradient(45deg, rgba(178, 173, 168, 0.4), rgba(187, 165, 161, 0.4), rgba(246, 227, 235, 0.3))'}}></div>
            <div className="relative bg-white/25 backdrop-blur-xl rounded-4xl p-10 border border-white/40 shadow-2xl">
              <div className="text-center space-y-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-full mb-6">
                  <i className="fas fa-exclamation text-white text-2xl"></i>
                </div>
                <h2 className="text-4xl lg:text-5xl font-cormorant font-bold leading-tight text-white">
                  TODAVÍA NO ESTÁS SUSCRITA EN LA LISTA
                </h2>
                <p className="text-2xl text-white leading-relaxed font-light max-w-4xl mx-auto">
                  Solo revisa el correo que te acabo de enviar a la dirección que me dejaste y haz clic en el enlace de confirmación.
                </p>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Tips Card */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl blur-2xl bg-white/20"></div>
              <div className="relative bg-white/30 backdrop-blur-lg rounded-3xl p-8 border border-white/40 shadow-xl h-full">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full mb-4">
                    <i className="fas fa-search text-white text-xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-300 mb-4">¿No lo encuentras?</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-white leading-relaxed font-medium">
                    Puede estar en la carpeta de <strong>Spam</strong>, <strong>Promociones</strong> o <strong>Notificaciones</strong>.
                  </p>
                  <div className="bg-white/20 rounded-2xl p-4 border border-white/30">
                    <p className="text-white leading-relaxed font-medium text-center">
                      También puedes probar agregando este correo a tu lista de contactos:
                    </p>
                    <div className="mt-3 text-center">
                      <span className="inline-block bg-yellow-300/20 px-4 py-2 rounded-lg font-bold text-yellow-300 text-lg border border-yellow-300/40">
                        info@marcelaresva.com
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notice Card */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl blur-2xl bg-yellow-300/30"></div>
              <div className="relative bg-yellow-300/30 backdrop-blur-lg rounded-3xl p-8 border-2 border-yellow-300/60 shadow-xl h-full">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-full mb-4">
                    <i className="fas fa-star text-white text-xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-300 mb-4">MUY IMPORTANTE</h3>
                </div>
                <div className="bg-white/20 rounded-2xl p-6 border border-white/30">
                  <p className="text-white leading-relaxed font-medium text-lg text-center">
                    Una vez confirmes tu suscripción, se abrirá una nueva página donde recibirás tus <strong>4 regalos espirituales</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Access Buttons */}
          <div className="text-center space-y-8">
            <h3 className="text-2xl font-cormorant font-bold text-white mb-6">
              Accede rápidamente a tu correo:
            </h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
              <Button 
                onClick={() => window.open('https://mail.google.com', '_blank')}
                className="group px-10 py-6 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 text-xl flex items-center justify-center space-x-4 relative overflow-hidden"
                style={{
                  backgroundColor: '#ea4335',
                  color: 'white',
                  borderColor: '#ea4335'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#d93025';
                  e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#ea4335';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <i className="fab fa-google text-2xl"></i>
                <span>Ir a Gmail</span>
                <i className="fas fa-arrow-right text-lg ml-2 transition-transform group-hover:translate-x-1"></i>
              </Button>
              
              <Button 
                onClick={() => window.open('https://outlook.live.com', '_blank')}
                className="group px-10 py-6 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 text-xl flex items-center justify-center space-x-4 relative overflow-hidden"
                style={{
                  backgroundColor: '#0078d4',
                  color: 'white',
                  borderColor: '#0078d4'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#106ebe';
                  e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#0078d4';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <i className="fab fa-microsoft text-2xl"></i>
                <span>Ir a Outlook</span>
                <i className="fas fa-arrow-right text-lg ml-2 transition-transform group-hover:translate-x-1"></i>
              </Button>
            </div>

            <div className="mt-8">
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 max-w-2xl mx-auto">
                <p className="text-white italic leading-relaxed font-medium">
                  <i className="fas fa-info-circle text-yellow-300 mr-2"></i>
                  Si te has registrado con un mail que no es ninguno de estos dos, no hay problema.
                  El proceso es el mismo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
