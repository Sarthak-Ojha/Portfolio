import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { MapPin, Mail, Github, Linkedin, ChevronDown } from 'lucide-react';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context> | null = null;

    const onLoad = () => {
      requestAnimationFrame(() => {
        ctx = gsap.context(() => {
          const tl = gsap.timeline();

          tl.fromTo(
            subtitleRef.current,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
            0
          );

          tl.fromTo(
            scrollIndicatorRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3 },
            0.55
          );
        }, sectionRef);
      });
    };

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad, { once: true });
    }

    return () => {
      ctx?.revert();
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section relative w-full h-screen overflow-hidden bg-transparent flex items-center pt-20"
    >
      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8 lg:px-16"
      >
        <h1
          className="text-5xl md:text-7xl lg:text-[5rem] font-bold tracking-tight text-[#0a0a0a] dark:text-[#fafafa] mb-4 uppercase"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Sarthak Ojha
        </h1>

        <div ref={subtitleRef} style={{ opacity: 0 }} className="space-y-6">
          <div className="space-y-2">
            <p
              className="text-2xl md:text-3xl text-[#525252] dark:text-[#d4d4d4]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Software Engineer
            </p>
            <p
              className="text-lg md:text-xl text-[#737373] dark:text-[#a3a3a3]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Mobile App & Full-Stack Developer
            </p>
          </div>

          {/* Contact Row */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-[#525252] dark:text-[#a3a3a3] text-sm md:text-base font-medium">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#525252] dark:text-[#a3a3a3]" />
              <span>Kathmandu, Nepal</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#525252] dark:text-[#a3a3a3]" />
              <span>sarthakojha.np@gmail.com</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a 
              href="#" 
              className="px-6 py-2.5 bg-[#0f172a] dark:bg-[#fafafa] text-white dark:text-[#0a0a0a] rounded-lg font-medium hover:bg-[#1e293b] dark:hover:bg-[#e5e5e5] transition-colors"
            >
              View CV
            </a>
            <a 
              href="#projects" 
              className="px-6 py-2.5 border border-[#e5e5e5] dark:border-[#333333] text-[#0a0a0a] dark:text-[#fafafa] rounded-lg font-medium hover:bg-[#fafafa] dark:hover:bg-[#1a1a1a] transition-colors"
            >
              View Projects
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 pt-4 text-[#525252] dark:text-[#a3a3a3]">
            <a href="https://github.com/Sarthak-Ojha" target="_blank" rel="noopener noreferrer" className="hover:text-[#0a0a0a] dark:hover:text-[#fafafa] transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/sarthak-ojha/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0a0a0a] dark:hover:text-[#fafafa] transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center z-20"
        style={{ opacity: 0 }}
      >
        <span className="tracking-widest text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase mb-2">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 animate-bounce text-[#a3a3a3] dark:text-neutral-500" />
      </div>
    </section>
  );
};

export default Hero;
