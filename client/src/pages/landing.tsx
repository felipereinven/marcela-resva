import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ParticleBackground } from "@/components/ui/particles";
import { VimeoPlayer } from "@/components/ui/vimeo-player";
import marcelaLogo from "@/assets/marcela-resva-logo.webp";
import marcelaPhoto from "@/assets/22_1752622341890.jpg";
import shiftingSoulsLogo from "@assets/IMG_0195-e1752623802409_1752623855399.webp";

const subscriptionSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().optional(),
  email: z.string().email("Email inválido"),
  currentMoment: z.string().optional(),
  terms: z.boolean().refine(val => val === true, "Debes aceptar los términos")
});

type SubscriptionForm = z.infer<typeof subscriptionSchema>;

export default function Landing() {
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const form = useForm<SubscriptionForm>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      currentMoment: "",
      terms: false
    }
  });

  const subscriptionMutation = useMutation({
    mutationFn: async (data: Omit<SubscriptionForm, "terms">) => {
      const response = await apiRequest("POST", "/api/subscribe", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "¡Bienvenida a Shifting Souls!",
        description: data.message,
      });
      navigate("/gracias");
    },
    onError: (error: any) => {
      toast({
        title: "Error al suscribirse",
        description: error.message || "Hubo un error al procesar tu solicitud. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: SubscriptionForm) => {
    const { terms, ...subscriptionData } = data;
    subscriptionMutation.mutate(subscriptionData);
  };

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
              <button onClick={() => scrollToSection('about')} className="text-white/90 hover:text-white transition-colors font-medium">
                Sobre Mí
              </button>
              <button onClick={() => scrollToSection('transformation')} className="text-white/90 hover:text-white transition-colors font-medium">
                Transformación
              </button>
              <button onClick={() => scrollToSection('community')} className="text-white/90 hover:text-white transition-colors font-medium">
                Comunidad
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-4 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8 text-center">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-cormorant font-bold leading-tight" style={{color: '#f6e3eb'}}>
                  Esa incomodidad que no sabes explicar, esa ansiedad sutil o ese cansancio que no se va con descanso… Son mensajes que vas a saber interpretar.
                </h1>
                <p className="text-xl text-white/95 leading-relaxed">
                  Sentir plenitud, vivir tu misión de vida y transformar el dolor en poder interior serán destrezas que vas a adquirir en nuestra casita… La casita de Shifting Souls.
                </p>
              </div>

              {/* Video Section */}
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl blur-2xl" style={{background: 'linear-gradient(to right, rgba(178, 173, 168, 0.3), rgba(187, 165, 161, 0.3))'}}></div>
                <div className="relative bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-xl">
                  <VimeoPlayer videoId="1101675966" title="Bienvenida Comunidad" />
                </div>
              </div>
              


              {/* Story Section */}
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl blur-2xl" style={{background: 'linear-gradient(to right, rgba(178, 173, 168, 0.3), rgba(187, 165, 161, 0.3))'}}></div>
                <div className="relative bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-xl">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                      <p className="text-white text-lg leading-relaxed">
                        Hace 10 años yo estaba pasando por un divorcio que me rompió y ahí llegó de nuevo esa sensación de estar pérdida… Pero también llegó la certeza de que ya no podía seguir viviendo igual.
                      </p>
                      <p className="text-white text-lg leading-relaxed">
                        Justo ahí nació nuestra comunidad hace 10 años, Shifting Souls nace en medio del deseo de traerles la sanación que yo estaba vivenciando y esa conexión con la divinidad.
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <img 
                        src={marcelaPhoto} 
                        alt="Marcela - Transformación espiritual" 
                        className="w-full h-[400px] object-cover object-top rounded-2xl" 
                      />
                      <div className="mt-4 text-center">
                        <p className="text-white font-medium text-lg">
                          "Mi proceso de Sanación me enseñó que puedo usar mis momentos más oscuros para salir a la luz con super poderes"
                        </p>
                        <p className="font-dancing text-xl mt-2 text-yellow-300">- Marcela</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Emptiness Section */}
      <section id="transformation" className="py-4 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-cormorant font-bold mb-6" style={{color: '#f6e3eb'}}>
              ¿Por qué esa "Sensación de Vacío" puede ser el portal hacia Sentirte Totalmente Plena?
            </h2>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto text-left">
              <div className="space-y-4 text-white text-lg leading-relaxed">
                <p>Cuando los árboles sueltan sus hojas en otoño y atraviesan un invierno en aparente vacío</p>
                <p>No florecen, no dan frutos, parecen inertes…</p>
                <p>Pero en ese tiempo, lo esencial ocurre bajo tierra, en las raíces.</p>
                <p className="font-bold">Sin ese vacío aparente, no habría primavera.</p>
                <p>El vacío en nosotras se puede extender en tiempo y/o longitud, pero siempre, siempre llegará la primavera.</p>
                <p className="font-semibold">En nuestro hogar también vivenciarás ese vacío, la DIFERENCIA radica en:</p>
                
                <ul className="space-y-3 mt-6">
                  <li className="flex items-start">
                    <span className="mr-3 text-yellow-300 font-bold">•</span>
                    <span>Si prefieres transitarlo acompañada o transitarlo en soledad.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-yellow-300 font-bold">•</span>
                    <span>Quieres que se sienta como un salto cuántico o esperar y que quizás se vuelva una eternidad.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-yellow-300 font-bold">•</span>
                    <span>Que tu proceso sea exigente pero sepas tomar acción o que el vacío se haga tan grande que sientas que no lo vas a lograr.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Achieve */}
      <section id="community" className="py-4 px-4 bg-gradient-to-r from-white/5 to-white/10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-cormorant font-bold mb-6" style={{color: '#f6e3eb'}}>
              ¿Qué lograrás en nuestra casita?
            </h2>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto text-left">
              <ul className="space-y-6 text-white text-lg leading-relaxed">
                <li className="flex items-start">
                  <span className="mr-4 text-yellow-300 font-bold text-xl">•</span>
                  <span>Liberar a las futuras generaciones de cargar con el peso del trabajo personal que te corresponde a ti.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-4 text-yellow-300 font-bold text-xl">•</span>
                  <span>Probar tu potencial y vivir a la altura de él.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-4 text-yellow-300 font-bold text-xl">•</span>
                  <span>Usar tus momentos más oscuros para salir a la luz con superpoderes.</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8">
              <Button 
                onClick={() => window.open('https://www.paypal.com/checkout', '_blank')}
                className="px-12 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-2 text-xl"
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
                Únete a Shifting Souls - $33.99/mes
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-4 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-4xl font-cormorant font-bold mb-6" style={{color: '#f6e3eb'}}>
              Únete a esta red de mujeres que, como tú, están respondiendo al llamado de su verdad.
            </h2>
            
            <Button 
              onClick={() => window.open('https://www.paypal.com/checkout', '_blank')}
              className="px-16 py-6 rounded-full font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-2 text-2xl"
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
              Unirme a Shifting Souls - $33.99/mes
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-lg border-t border-white/20 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
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

            <div>
              <h4 className="text-white font-semibold mb-4">Conecta Conmigo</h4>
              <div className="space-y-2">
                <a href="mailto:info@marcelaresva.com" className="text-white/70 hover:text-dusty-rose transition-colors text-sm block">
                  <i className="fas fa-envelope mr-2"></i>
                  info@marcelaresva.com
                </a>
                <a href="https://www.instagram.com/shiftingsouls" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-dusty-rose transition-colors text-sm block">
                  <i className="fab fa-instagram mr-2"></i>
                  @shiftingsouls
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Testimonios</h4>
              <blockquote className="text-white/70 text-sm italic">
                "Marcela me ayudó a encontrar mi camino cuando todo parecía perdido. Su guía es pura magia."
              </blockquote>
              <cite className="text-dusty-rose text-sm block mt-2">- Ana M.</cite>
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
