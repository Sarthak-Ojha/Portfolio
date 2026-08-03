import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { MapPin, Mail, Github, Linkedin, ChevronDown, X } from 'lucide-react';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context> | null = null;

    const onLoad = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.fromTo(
              subtitleRef.current,
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', force3D: true },
              0
            );

            tl.fromTo(
              scrollIndicatorRef.current,
              { opacity: 0 },
              { opacity: 1, duration: 0.3, force3D: true },
              0.55
            );
          }, sectionRef);
        });
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
      className="hero-section relative w-full h-screen overflow-hidden bg-transparent flex items-center pt-16"
    >
      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full"
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
              className="text-2xl md:text-3xl text-[#262626] dark:text-[#e5e5e5]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Software Developer
            </p>
            <p
              className="text-lg md:text-xl text-[#404040] dark:text-[#d4d4d4]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Mobile App & Full-Stack Developer
            </p>
          </div>

          {/* Contact Row */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-[#262626] dark:text-[#d4d4d4] text-sm md:text-base font-medium">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#262626] dark:text-[#d4d4d4]" />
              <span>Kathmandu, Nepal</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#262626] dark:text-[#d4d4d4]" />
              <span>sarthakojha.np@gmail.com</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setIsCVModalOpen(true)}
              className="px-6 py-2.5 bg-[#0f172a] dark:bg-[#fafafa] text-gray-400 dark:text-gray-500 rounded-lg font-medium hover:bg-[#1e293b] dark:hover:bg-[#e5e5e5] transition-colors"
            >
              View CV
            </button>
            <a
              href="#projects"
              className="px-6 py-2.5 border border-[#e5e5e5] dark:border-[#333333] text-[#0a0a0a] dark:text-[#fafafa] rounded-lg font-medium hover:bg-[#fafafa] dark:hover:bg-[#1a1a1a] transition-colors"
            >
              View Projects
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 items-center pt-4 text-[#262626] dark:text-[#d4d4d4]">
            <a href="https://github.com/Sarthak-Ojha" target="_blank" rel="noopener noreferrer" className="hover:text-[#0a0a0a] dark:hover:text-[#fafafa] transition-colors" aria-label="Visit Sarthak Ojha's GitHub profile">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/sarthak-ojha/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0a0a0a] dark:hover:text-[#fafafa] transition-colors" aria-label="Visit Sarthak Ojha's LinkedIn profile">
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

      {/* CV Modal */}
      {isCVModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsCVModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#333]">
              <h3 className="text-xl font-bold text-[#0a0a0a] dark:text-[#fafafa]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Resume
              </h3>
              <button
                onClick={() => setIsCVModalOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors text-[#0a0a0a] dark:text-[#fafafa]"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="w-full h-[80vh]">
              <iframe
                src="/Sarthak_Ojha_Resume.pdf"
                className="w-full h-full border-0"
                title="CV Preview"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
