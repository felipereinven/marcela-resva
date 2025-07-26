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
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-left lg:text-left">
                <h2 className="text-xl font-dancing" style={{color: '#f6e3eb'}}>Recibe 3 regalos al registrarte</h2>
                <h1 className="text-4xl lg:text-5xl font-cormorant font-bold leading-tight" style={{color: '#f6e3eb'}}>
                  Transforma tu crisis espiritual en{" "}
                  <span className="font-bold drop-shadow-lg bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                    despertar consciente
                  </span>
                </h1>
                <p className="text-lg text-white/95 leading-relaxed">
                  Únete gratis y recibe herramientas poderosas para reconectar con tu divinidad y descubrir tu misión de vida.
                </p>
                
                {/* Newsletter Form */}
                <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-xl">
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium text-white">
                          Nombre
                        </label>
                        <input
                          {...form.register("firstName")}
                          type="text"
                          className="w-full px-4 py-3 bg-white/90 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-dusty-rose/50 text-gray-800 placeholder-gray-500"
                          placeholder="Tu nombre"
                        />
                        {form.formState.errors.firstName && (
                          <p className="text-red-300 text-sm">{form.formState.errors.firstName.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium text-white">
                          Apellido
                        </label>
                        <input
                          {...form.register("lastName")}
                          type="text"
                          className="w-full px-4 py-3 bg-white/90 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-dusty-rose/50 text-gray-800 placeholder-gray-500"
                          placeholder="Tu apellido"
                        />
                        {form.formState.errors.lastName && (
                          <p className="text-red-300 text-sm">{form.formState.errors.lastName.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-white">
                        Email
                      </label>
                      <input
                        {...form.register("email")}
                        type="email"
                        className="w-full px-4 py-3 bg-white/90 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-dusty-rose/50 text-gray-800 placeholder-gray-500"
                        placeholder="tu@email.com"
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-300 text-sm">{form.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="currentMoment" className="text-sm font-medium text-white">
                        ¿En qué momento espiritual te encuentras?
                      </label>
                      <select
                        {...form.register("currentMoment")}
                        className="w-full px-4 py-3 bg-white/90 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-dusty-rose/50 text-gray-800"
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="beginning">Comenzando mi despertar espiritual</option>
                        <option value="crisis">En medio de una crisis espiritual</option>
                        <option value="seeking">Buscando mi propósito de vida</option>
                        <option value="healing">Sanando heridas del pasado</option>
                        <option value="growing">Creciendo espiritualmente</option>
                      </select>
                      {form.formState.errors.currentMoment && (
                        <p className="text-red-300 text-sm">{form.formState.errors.currentMoment.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={subscriptionMutation.isPending}
                      className="w-full py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
                      style={{
                        backgroundColor: '#f6e3eb',
                        color: '#976e73'
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
                      {subscriptionMutation.isPending ? "Registrando..." : "Recibir Mis 3 Regalos Gratis"}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Video Section */}
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl blur-2xl" style={{background: 'linear-gradient(to right, rgba(178, 173, 168, 0.3), rgba(187, 165, 161, 0.3))'}}></div>
                <div className="relative bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-xl">
                  <VimeoPlayer videoId="1101676211" title="Landing page Aprobada" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Gifts Section */}
      <section className="py-4 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-cormorant font-bold mb-4 text-white">
              Estos son los 3 regalos que recibirás al registrarte
            </h2>
            <p className="text-xl text-white/95 mb-8">
              Herramientas poderosas para comenzar tu transformación espiritual hoy mismo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: "fas fa-gift", 
                title: "Meditación Guiada de Reconexión", 
                description: "Audio exclusivo de 20 minutos para conectar con tu divinidad interior y encontrar paz en medio de la crisis" 
              },
              { 
                icon: "fas fa-book-open", 
                title: "Guía PDF: Primeros Pasos del Despertar", 
                description: "Manual práctico con ejercicios y técnicas para navegar tu proceso de transformación espiritual" 
              },
              { 
                icon: "fas fa-heart", 
                title: "Acceso a Sesión en Vivo", 
                description: "Invitación especial a nuestra próxima sesión 'Pregúntale a tus Ángeles' donde podrás hacer tus preguntas" 
              }
            ].map((gift, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`${gift.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-cormorant font-bold text-white mb-3">{gift.title}</h3>
                  <p className="text-white/90 leading-relaxed">{gift.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-lg text-yellow-300 font-semibold">
              ¡Todo esto es completamente GRATIS al registrarte!
            </p>
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
