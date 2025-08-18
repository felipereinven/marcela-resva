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
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-cormorant font-bold mb-6" style={{color: '#f6e3eb'}}>
              <span className="text-yellow-300">ÚLTIMO PASO</span>
            </h1>
          </div>



          {/* Main Content */}
          <div className="relative mb-12">
            <div className="absolute -inset-4 rounded-3xl blur-2xl" style={{background: 'linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3))'}}></div>
            <div className="relative bg-black/50 backdrop-blur-lg rounded-3xl p-8 border border-white/50 shadow-2xl">
              <div className="text-center space-y-6">
                <h2 className="text-3xl lg:text-4xl font-cormorant font-bold mb-6 text-white drop-shadow-lg">
                  TODAVÍA NO ESTÁS SUSCRITA EN LA LISTA
                </h2>
                <p className="text-xl text-white leading-relaxed mb-6 font-semibold drop-shadow-md">
                  Solo revisa el correo que te acabo de enviar a la dirección que me dejaste y haz clic en el enlace de confirmación.
                </p>
                
                <div className="bg-white/80 rounded-2xl p-6 mb-6 border border-white shadow-lg">
                  <h3 className="text-lg font-bold text-purple-800 mb-4">¿No lo encuentras?</h3>
                  <p className="text-gray-800 mb-4 leading-relaxed font-semibold">
                    Puede estar en la carpeta de Spam, Promociones o Notificaciones.
                  </p>
                  <p className="text-gray-800 leading-relaxed font-semibold">
                    También puedes probar agregando este correo a tu lista de contactos:
                    <br />
                    <span className="font-bold text-purple-800 text-lg">info@marcelaresva.com</span>
                  </p>
                </div>

                <div className="bg-yellow-300/90 border-2 border-yellow-400 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-purple-900 mb-4">MUY IMPORTANTE</h3>
                  <p className="text-purple-900 leading-relaxed font-bold">
                    Una vez confirmes tu suscripción, se abrirá una nueva página donde recibirás tus regalos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Buttons */}
          <div className="text-center space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <Button 
                onClick={() => window.open('https://mail.google.com', '_blank')}
                className="px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-2 text-lg flex items-center justify-center space-x-3"
                style={{
                  backgroundColor: '#ea4335',
                  color: 'white',
                  borderColor: '#ea4335'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#d93025';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#ea4335';
                }}
              >
                <i className="fab fa-google text-xl"></i>
                <span>Ir a Gmail</span>
              </Button>
              
              <Button 
                onClick={() => window.open('https://outlook.live.com', '_blank')}
                className="px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-2 text-lg flex items-center justify-center space-x-3"
                style={{
                  backgroundColor: '#0078d4',
                  color: 'white',
                  borderColor: '#0078d4'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#106ebe';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#0078d4';
                }}
              >
                <i className="fab fa-microsoft text-xl"></i>
                <span>Ir a Outlook</span>
              </Button>
            </div>

            <p className="text-sm text-white italic max-w-xl mx-auto leading-relaxed font-bold drop-shadow-md bg-black/30 rounded-lg p-3">
              *Si te has registrado con un mail que no es ninguno de estos dos, no hay problema.
              El proceso es el mismo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
