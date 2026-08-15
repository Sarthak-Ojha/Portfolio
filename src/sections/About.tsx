import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { Code, Smartphone, Layers } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label entrance
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, x: -30, letterSpacing: '10px' },
        {
          opacity: 1,
          x: 0,
          letterSpacing: '2px',
          duration: 0.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Heading word split animation
      const words = headingRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // Paragraphs reveal
      const paragraphs = paragraphsRef.current?.querySelectorAll('p');
      if (paragraphs) {
        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: paragraphsRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Stats counter animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        statItems.forEach((item: any, index: number) => {
          const numberEl = item.querySelector('.stat-number');
          const suffix = item.getAttribute('data-suffix') || '';
          const targetValue = parseInt(item.getAttribute('data-value') || '0');

          gsap.fromTo(
            item,
            { opacity: 0, scale: 0.5 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              delay: index * 0.15,
              ease: 'elastic.out(1, 0.5)',
              scrollTrigger: {
                trigger: statsRef.current,
                start: 'top 85%',
              },
            }
          );

          // Counter animation
          if (numberEl && targetValue > 0) {
            const counter = { value: 0 };
            gsap.to(counter, {
              value: targetValue,
              duration: 2,
              delay: 0.5 + index * 0.15,
              ease: 'power2.out',
              onUpdate: () => {
                numberEl.textContent = Math.floor(counter.value) + suffix;
              },
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 2, suffix: '+', label: 'Years Experience', icon: Code },
    { value: 3, suffix: '+', label: 'Android & Cross-Platform Apps', icon: Smartphone },
    { value: 2, suffix: '+', label: 'Full-Stack Solutions Built', icon: Layers },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section relative w-full py-20 border-t border-gray-200 dark:border-[#2a2a2a] overflow-hidden bg-transparent"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 w-full relative z-10">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-4xl font-extrabold text-[#0a0a0a] dark:text-[#fafafa] mb-8 tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          About
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Bio Content */}
          <div ref={paragraphsRef}>
            <p
              className="text-lg md:text-xl leading-relaxed text-[#262626] dark:text-[#d4d4d4] mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              I am a Software Developer specializing in Flutter, Firebase, and Full-stack Web development.
            </p>
            <p
              className="text-lg md:text-xl leading-relaxed text-[#262626] dark:text-[#d4d4d4]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              I build high-performance, production-ready mobile apps and modern web ecosystems using Flutter, React, Next.js, and PostgreSQL. My process focuses heavily on clean architecture, type-safe development, and crafting fluid user experiences from frontend to deployment.
            </p>
          </div>

          {/* Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-1 gap-8 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-item flex flex-col"
                data-value={stat.value}
                data-suffix={stat.suffix}
              >
                <div className="flex items-center gap-3 mb-2">
                  <stat.icon
                    className="w-5 h-5 text-[#404040] dark:text-[#a3a3a3]"
                  />
                  <div
                    className="stat-number text-3xl md:text-4xl font-bold text-[#0a0a0a] dark:text-[#fafafa]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    0{stat.suffix}
                  </div>
                </div>
                <div
                  className="text-sm font-semibold text-[#262626] dark:text-[#d4d4d4]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
