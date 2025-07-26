import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { VimeoPlayer } from '@/components/ui/vimeo-player';
import { ParticleBackground } from '@/components/ui/particles';
import { apiRequest } from '@/lib/queryClient';
import { useLocation } from 'wouter';
import marcelaPhoto from "@/assets/22_1752622341890.jpg";
import shiftingSoulsLogo from "@assets/IMG_0195-e1752623802409_1752623855399.webp";

const subscriptionSchema = z.object({
  firstName: z.string().min(1, 'El nombre es requerido'),
  lastName: z.string().optional(),
  email: z.string().email('Email inválido'),
  currentMoment: z.string().min(1, 'Por favor selecciona una opción'),
  terms: z.boolean().refine(val => val === true, 'Debes aceptar los términos')
});

type SubscriptionForm = z.infer<typeof subscriptionSchema>;

export default function MembresiaPage() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<SubscriptionForm>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      currentMoment: '',
      terms: false,
    },
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
      setLocation('/gracias');
    },
    onError: (error: any) => {
      console.error('Subscription error:', error);
      toast({
        title: "Error",
        description: error.message || "Hubo un problema al procesar tu suscripción. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
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

  return (
    <div className="min-h-screen font-poppins" style={{background: "linear-gradient(135deg, #976e73 0%, #ae667d 50%, #b09196 100%)"}}>
      <ParticleBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/15 backdrop-blur-xl border-b border-white/30 transition-all duration-300 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={shiftingSoulsLogo} 
                alt="Shifting Souls" 
                className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
              />
              <span className="text-2xl font-cormorant font-bold" style={{color: '#f6e3eb'}}>
                Shifting Souls
              </span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#transformation" className="hover:opacity-80 transition-opacity" style={{color: '#f6e3eb'}}>
                Membresía
              </a>
              <a href="#community" className="hover:opacity-80 transition-opacity" style={{color: '#f6e3eb'}}>
                Comunidad
              </a>
              <a href="#newsletter-signup" className="hover:opacity-80 transition-opacity" style={{color: '#f6e3eb'}}>
                Únete
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-4 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8 text-center">
              <div className="space-y-6">
                <h1 className="text-3xl lg:text-4xl font-cormorant font-bold leading-tight" style={{color: '#f6e3eb'}}>
                  Esa incomodidad que no sabes explicar, esa ansiedad sutil o ese cansancio que no se va con descanso… Son mensajes que vas a saber interpretar.
                </h1>
                <p className="text-xl text-white/95 leading-relaxed">
                  Sentir plenitud, vivir tu misión de vida y transformar el dolor en poder interior serán destrezas que vas a adquirir en nuestra casita… La casita de Shifting Souls.
                </p>
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
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-cormorant font-bold mb-6" style={{color: '#f6e3eb'}}>
              ¿Qué lograrás en nuestra casita?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 hover:transform hover:scale-105 shadow-xl">
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{
                      background: 'linear-gradient(to bottom right, #976e73, #ae667d)'
                    }}
                  >
                    <i className="fas fa-heart text-white text-2xl"></i>
                  </div>
                  <p className="leading-relaxed text-white text-lg">
                    Liberar a las futuras generaciones de cargar con el peso del trabajo personal que te corresponde a ti.
                  </p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 hover:transform hover:scale-105 shadow-xl">
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{
                      background: 'linear-gradient(to bottom right, #b2ada8, #bba5a1)'
                    }}
                  >
                    <i className="fas fa-star text-white text-2xl"></i>
                  </div>
                  <p className="leading-relaxed text-white text-lg">
                    Probar tu potencial y vivir a la altura de él.
                  </p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 hover:transform hover:scale-105 shadow-xl">
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{
                      background: 'linear-gradient(to bottom right, #ae667d, #b09196)'
                    }}
                  >
                    <i className="fas fa-bolt text-white text-2xl"></i>
                  </div>
                  <p className="leading-relaxed text-white text-lg">
                    Usar tus momentos más oscuros para salir a la luz con superpoderes.
                  </p>
                </div>
              </div>
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
      <footer className="py-8 px-4 border-t border-white/20">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                <img 
                  src={shiftingSoulsLogo} 
                  alt="Shifting Souls" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-xl font-cormorant font-bold" style={{color: '#f6e3eb'}}>
                  Shifting Souls
                </span>
              </div>
              <p className="text-sm" style={{color: '#f6e3eb', opacity: 0.8}}>
                Transformación espiritual para mujeres que buscan reconectar con su divinidad
              </p>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold mb-4" style={{color: '#f6e3eb'}}>Síguenos</h4>
              <div className="flex justify-center space-x-4">
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <i className="fab fa-instagram text-2xl" style={{color: '#f6e3eb'}}></i>
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <i className="fab fa-facebook text-2xl" style={{color: '#f6e3eb'}}></i>
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <i className="fab fa-youtube text-2xl" style={{color: '#f6e3eb'}}></i>
                </a>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <h4 className="font-semibold mb-4" style={{color: '#f6e3eb'}}>Contacto</h4>
              <p className="text-sm" style={{color: '#f6e3eb', opacity: 0.8}}>
                info@marcelaresva.com
              </p>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-6 text-center">
            <p className="text-sm" style={{color: '#f6e3eb', opacity: 0.7}}>
              © 2025 Marcela Resva - Shifting Souls. Todos los derechos reservados.
            </p>
            <p className="text-xs mt-2" style={{color: '#f6e3eb', opacity: 0.6}}>
              Diseño por Felipe Reinven
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}