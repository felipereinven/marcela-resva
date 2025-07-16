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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 font-poppins">
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
                <h2 className="text-xl font-dancing text-warm-gold">Bienvenida al despertar</h2>
                <h1 className="text-5xl lg:text-6xl font-cormorant font-bold text-white leading-tight">
                  Convierte tu{" "}
                  <span className="text-warm-gold font-bold drop-shadow-lg">
                    noche oscura
                  </span>
                  {" "}en el amanecer de tu propósito
                </h1>
                <p className="text-xl text-white/95 leading-relaxed">
                  Acompaño a mujeres que se encuentran en medio de una crisis espiritual a reconectar con su divinidad, descubrir su misión de vida y transformar el dolor en poder interior.
                </p>
              </div>

              {/* Video Section */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-celestial-blue/30 to-mystic-purple/30 rounded-3xl blur-2xl"></div>
                <div className="relative bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-xl">
                  <VimeoPlayer videoId="1101675966" title="Bienvenida Comunidad" />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => scrollToSection('newsletter-signup')}
                  className="bg-white text-purple-900 px-8 py-4 rounded-full font-bold hover:bg-purple-50 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 border-2 border-white"
                >
                  Comenzar Mi Transformación
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => scrollToSection('transformation')}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-purple-900 transition-all duration-300 transform hover:scale-105 bg-transparent"
                >
                  Conoce el Proceso
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-8 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-warm-gold">3000+</div>
                  <div className="text-white/90 text-sm font-medium">Almas transformadas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warm-gold">30</div>
                  <div className="text-white/90 text-sm font-medium">Días para cambiar</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warm-gold">24/7</div>
                  <div className="text-white/90 text-sm font-medium">Apoyo divino</div>
                </div>
              </div>

              {/* Testimonial Section */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-warm-gold/30 to-rose-gold/30 rounded-3xl blur-2xl"></div>
                <div className="relative bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-xl">
                  <img 
                    src={marcelaPhoto} 
                    alt="Marcela - Transformación espiritual" 
                    className="w-full h-[500px] object-cover object-top rounded-2xl" 
                  />
                  
                  <div className="mt-6 text-center">
                    <p className="text-white font-medium text-lg">
                      "Mi proceso de sanación me mostró que renacer es posible"
                    </p>
                    <p className="text-warm-gold font-dancing text-xl mt-2">- Marcela</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Transformation Journey */}
      <section id="transformation" className="py-4 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-cormorant font-bold text-white mb-4">
              Tu Viaje de Transformación
            </h2>
            <p className="text-xl text-white/95 max-w-2xl mx-auto">
              En 30 días comenzarás a tomar decisiones coherentes, recuperar la confianza y dar pasos concretos hacia la vida que tu alma anhela.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 hover:transform hover:scale-105 shadow-xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-warm-gold to-rose-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-moon text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-cormorant font-bold text-white mb-4">Reconoce tu Noche Oscura</h3>
                <p className="text-white/95 leading-relaxed">
                  Identifica las señales de tu alma pidiendo transformación. Abraza la oscuridad como el primer paso hacia tu amanecer.
                </p>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 hover:transform hover:scale-105 shadow-xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-celestial-blue to-mystic-teal rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-feather-alt text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-cormorant font-bold text-white mb-4">Conecta con tu Divinidad</h3>
                <p className="text-white/95 leading-relaxed">
                  Fortalece tu conexión con los ángeles y tu guía interior. Aprende a escuchar las señales divinas que siempre han estado ahí.
                </p>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 hover:transform hover:scale-105 shadow-xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-mystic-purple to-rose-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-sun text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-cormorant font-bold text-white mb-4">Manifiesta tu Propósito</h3>
                <p className="text-white/95 leading-relaxed">
                  Descubre tu misión de vida y crea una existencia alineada con tu alma. Transforma el dolor en poder interior.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section id="community" className="py-4 px-4 bg-gradient-to-r from-white/5 to-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-cormorant font-bold text-white mb-4">
              Lo que recibirás en Shifting Souls
            </h2>
            <p className="text-xl text-white/95">
              Una comunidad sagrada por solo <span className="text-warm-gold font-bold">$33.99/mes</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "fas fa-praying-hands", title: "Meditaciones Guiadas", description: "Sesiones de meditación personalizadas para tu despertar espiritual" },
              { icon: "fas fa-heart", title: "Terapias de Sanación", description: "Procesos de sanación profunda para liberar traumas y bloqueos" },
              { icon: "fas fa-angel", title: "Pregúntale a tus Ángeles", description: "Sesiones en vivo mensuales y grabadas semanales" },
              { icon: "fas fa-users", title: "Comunidad Sagrada", description: "Conecta con otras mujeres en el mismo proceso de transformación" },
              { icon: "fas fa-book", title: "Recursos Exclusivos", description: "Libros, cursos y descuentos especiales para miembros" },
              { icon: "fas fa-calendar-star", title: "Eventos Presenciales", description: "Talleres y retiros para profundizar tu conexión espiritual" }
            ].map((item, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-lg">
                <div className="flex items-center mb-4">
                  <i className={`${item.icon} text-warm-gold text-xl mr-3`}></i>
                  <h3 className="text-white font-semibold">{item.title}</h3>
                </div>
                <p className="text-white/95 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section id="newsletter-signup" className="py-4 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-cormorant font-bold text-white mb-4">
              Comienza tu transformación hoy
            </h2>
            <p className="text-xl text-white/95">
              Únete a nuestra comunidad y recibe contenido exclusivo para iniciar tu despertar espiritual
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 border border-white/60 shadow-xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-cormorant font-bold text-gray-800 mb-2">
                Tu alma te está llamando
              </h3>
              <p className="text-gray-600 text-sm">
                Únete a miles de mujeres que ya están transformando su vida. El cambio comienza ahora.
              </p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-800 font-semibold">Nombre *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            placeholder="Tu nombre"
                            className="bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-800 font-semibold">Apellido</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            placeholder="Tu apellido"
                            className="bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800 font-semibold">Email *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          type="email"
                          placeholder="tu@email.com"
                          className="bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currentMoment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800 font-semibold">¿Qué te resuena más de tu momento actual?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white border-gray-300 text-gray-900 focus:ring-purple-500 focus:border-purple-500 shadow-sm">
                            <SelectValue placeholder="Selecciona una opción" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="crisis-espiritual">Estoy en medio de una crisis espiritual</SelectItem>
                          <SelectItem value="busco-proposito">Busco mi propósito de vida</SelectItem>
                          <SelectItem value="conectar-angeles">Quiero conectar con mis ángeles</SelectItem>
                          <SelectItem value="transformar-dolor">Necesito transformar mi dolor</SelectItem>
                          <SelectItem value="comunidad-espiritual">Busco una comunidad espiritual</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-gray-400 text-purple-600 focus:ring-purple-500"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-gray-700 font-medium text-sm">
                          Acepto recibir información sobre Shifting Souls y entiendo que puedo cancelar mi suscripción en cualquier momento.
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={subscriptionMutation.isPending}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold py-4 px-8 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 hover:from-purple-700 hover:to-purple-900"
                >
                  {subscriptionMutation.isPending ? (
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                  ) : (
                    <i className="fas fa-feather-alt mr-2"></i>
                  )}
                  {subscriptionMutation.isPending ? "Procesando..." : "Iniciar Mi Transformación"}
                </Button>
              </form>
            </Form>
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
                <a href="mailto:info@marcelaresva.com" className="text-white/70 hover:text-warm-gold transition-colors text-sm block">
                  <i className="fas fa-envelope mr-2"></i>
                  info@marcelaresva.com
                </a>
                <a href="https://www.instagram.com/shiftingsouls" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-warm-gold transition-colors text-sm block">
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
              <cite className="text-warm-gold text-sm block mt-2">- Ana M.</cite>
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
