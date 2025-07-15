import { useEffect, useRef } from "react";

export function ParticleBackground() {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createParticles = () => {
      const particles = particlesRef.current;
      if (!particles) return;

      particles.innerHTML = '';
      
      const particleCount = window.innerWidth < 768 ? 20 : window.innerWidth < 1200 ? 35 : 50;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-white/30 rounded-full animate-pulse';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particles.appendChild(particle);
        
        // Float animation
        const animateFloat = () => {
          particle.style.transform = `translateY(${Math.sin(Date.now() * 0.001 + i) * 20}px)`;
          requestAnimationFrame(animateFloat);
        };
        animateFloat();
      }
    };

    createParticles();

    const handleResize = () => {
      createParticles();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-mystic-purple/20 via-celestial-blue/20 to-indigo-900/20"></div>
      <div ref={particlesRef} className="absolute inset-0"></div>
    </div>
  );
}
